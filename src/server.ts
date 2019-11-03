import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import http from 'http';
import socketio from 'socket.io';

import { config } from 'dotenv';

import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import database from './database';


const app = express();
const server = http.createServer(app);
const io = socketio(server);

config();

(async () => {
  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  if (process.env.NODE_ENV === 'development') app.use(bodyParser.urlencoded({ extended: true }));

  const { models } = await database();

  app.locals.models = models;

  const { Order, OrderItem } = models;

  const orders = await Order.findAll({
    attributes: ['id', 'status', 'method'],
    include: {
      model: OrderItem,
      attributes: ['id', 'key', 'price', 'category'],
    },
  });

  server.listen(process.env.APP_PORT, () => {
    console.log('Listening on 3001...');
  });

  const errorHandler = (err: any, res: Response) => {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'UNKNOWN' })
      .end();
  };

  /**
   * Login
   */

  /* app.post('/login', [
    check('pin')
      .isLength(6)
  ]) */

  const generateToken = () => jwt.sign(
    { turbobouffe: 'ARENA4EVER' },
    process.env.APP_TOKEN_SECRET,
    {
      expiresIn: process.env.APP_TOKEN_EXPIRES,
    },
  );

  app.post('/login', (req: Request, res: Response) => {
    try {
      const { pin } = req.body;

      if (pin !== process.env.APP_PIN) {
        return res
          .status(400)
          .json({ error: 'INVALID_PIN' })
          .end();
      }

      return res
        .status(200)
        .json({ token: generateToken() })
        .end();
    }
    catch (err) {
      return errorHandler(err, res);
    }
  });

  app.post('/refreshToken', (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      jwt.verify(token, process.env.APP_TOKEN_SECRET);

      return res
        .status(200)
        .json({ token: generateToken() })
        .end();
    }
    catch (err) {
      return res
        .status(400)
        .json({ error: 'INVALID_TOKEN' })
        .end();
    }
  });

  io.on('connection', (socket: any) => {
    console.log('A user has connected');

    socket.on('addOrder', async (order: any) => {
      console.log('New Order !');

      const newOrder = await Order.create(
        {
          method: order.method,
          orderItems: order.items,
        },
        {
          include: [OrderItem],
        },
      );

      orders.push(newOrder);

      io.sockets.emit('ordersUpdate', orders);
    });

    socket.on('setOrderStatus', async (order: any) => {
      try {
        console.log(`Order ${order.id} upgrade`);

        const orderUpdated = await Order.findByPk(order.id);
        orderUpdated.status = order.status;

        await orderUpdated.save();

        orders.indexOf(order) = orderUpdated;

        io.sockets.emit('ordersUpdate', orders);
      }
      catch (err) {
        console.error(err);
      }
    });

    socket.on('refreshOrders', () => {
      io.sockets.emit('ordersUpdate', orders);
    });

    socket.on('disconnect', () => {
      console.log('A user has disconnected !');
    });
  });
})();
