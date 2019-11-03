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

  const getOrders = () => Order.findAll({
    attributes: ['id', 'status', 'method'],
    include: {
      model: OrderItem,
      attributes: ['id', 'key', 'price', 'category'],
    },
  });

  const notifyOrdersUpdated = async () => {
    const orders = await getOrders();
    io.sockets.emit('ordersUpdate', orders);
  };

  app.get('/orders', async (req: Request, res: Response) => {
    try {
      // todo: filtrer ça
      const orders = await getOrders();

      return res
        .status(200)
        .json(orders)
        .end();
    }

    catch (err) {
      errorHandler(err, res);
    }
  });

  app.post('/orders', async (req: Request, res: Response) => {

    try {
      const { method, items } = req.body;

      if (items.length === 0) {
        return res
          .status(400)
          .json({ error: 'BASKET_EMPTY' })
          .end();
      }

      await Order.create(
        {
          method,
          orderItems: items,
        },
        {
          include: [OrderItem],
        },
      );

      notifyOrdersUpdated();

      return res
        .status(204)
        .end();
    }

    catch (err) {
      errorHandler(err, res);
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


    /* socket.on('setOrderStatus', async (order: any) => {
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
    }); */

    socket.on('disconnect', () => {
      console.log('A user has disconnected !');
    });
  });
})();
