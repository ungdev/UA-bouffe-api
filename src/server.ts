import express from 'express';
import http from 'http';
import socketio from 'socket.io';

import { config } from 'dotenv';

import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import database from './database';
import { notFound } from './utils/errorHandler';
import routes from './controllers';
import restricLocalIP from './middlewares/restricLocalIP';
import log from './utils/log';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

config();

(async () => {
  const { models } = await database();

  app.locals.models = models;
  app.locals.io = io;

  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  if (process.env.NODE_ENV === 'development') app.use(bodyParser.urlencoded({ extended: true })); // For postman

  app.use(restricLocalIP());
  app.use(routes(models));
  app.use(notFound());

  server.listen(process.env.APP_PORT, () => {
    log.info(`Listening on ${process.env.APP_PORT}...`);
  });
})();
