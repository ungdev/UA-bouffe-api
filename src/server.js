require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const database = require('./database');
const sequelize = require('sequelize');

const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

(async () => {
  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  if (process.env.NODE_ENV === 'development')
    app.use(bodyParser.urlencoded({ extended: true }));

  const { sequelize, models } = await database();

  app.locals.models = models;

  const { Order, OrderItem } = models;

  const orders = await Order.findAll({
    attributes: ['id', 'status', 'method'],
    include: {
      model: OrderItem,
      attributes: ['id', 'key', 'price', 'category']
    }
  });

  http.listen(process.env.APP_PORT, () => {
    console.log('Listening on 3001...');
  });

  const errorHandler = (err, res) => {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'UNKNOWN' })
      .end();
  };

  /**
   * Login
   */

  /*app.post('/login', [
    check('pin')
      .isLength(6)
  ])*/

  const generateToken = () => {
    return jwt.sign(
      { turbobouffe: 'ARENA4EVER' },
      process.env.APP_TOKEN_SECRET,
      {
        expiresIn: process.env.APP_TOKEN_EXPIRES
      }
    );
  };

  app.post('/login', (req, res) => {
    try {
      const pin = req.body.pin;

      if (pin != process.env.APP_PIN) {
        return res
          .status(400)
          .json({ error: 'INVALID_PIN' })
          .end();
      }

      return res
        .status(200)
        .json({ token: generateToken() })
        .end();
    } catch (err) {
      return errorHandler(err, res);
    }
  });

  app.post('/refreshToken', (req, res) => {
    try {
      const token = req.body.token;

      jwt.verify(token, process.env.APP_TOKEN_SECRET);

      return res
        .status(200)
        .json({ token: generateToken() })
        .end();
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'INVALID_TOKEN' })
        .end();
    }
  });

  io.on('connection', (socket) => {
    console.log('A user has connected');

    socket.on('addOrder', async (order) => {
      console.log('New Order !');

      const newOrder = await Order.create(
        {
          method: order.method,
          orderItems: order.items
        },
        {
          include: [OrderItem]
        }
      );

      orders.push(newOrder);

      io.sockets.emit('ordersUpdate', orders);
    });

    socket.on('setOrderStatus', async (order) => {

      try {
      console.log(`Order ${order.id} upgrade`);

      const orderUpdated = await Order.findByPk(order.id);
      orderUpdated.status = order.status;

      await orderUpdated.save();

      orders.indexOf(order) = orderUpdated;
      /*orders = orders.map((order) =>
        order.id === orderUpdated.id
          ? { ...order, status: orderUpdated.status }
          : order*/

      io.sockets.emit('ordersUpdate', orders);

      }
      catch(err) {
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
