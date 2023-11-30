import express, { Request, Response } from 'express';
import http from 'http';
import { Server as SockerServer } from 'socket.io';
import fs from 'fs';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import database from './database';
import { notFound } from './utils/responses';
import routes from './controllers';
import log from './utils/log';
import devEnv from './utils/devEnv';
import { monitorInternetConnection } from './sockets/notifyNetworkStatus';

const app = express();
const server = http.createServer(app);
const io = new SockerServer(server, {
  pingInterval: 2000,
  pingTimeout: 5000,
  cors: {
    origin: '*',
  },
});

config();

(async () => {
  await database();

  app.locals.io = io;

  app.use(morgan(devEnv() ? 'dev' : 'combined'));

  morgan.token('username', (req: Request) => (req.user ? req.user.key : 'anonymous'));
  morgan.token('ip', (req: Request) => req.header('x-forwarded-for') || req.connection.remoteAddress);

  app.use(
    morgan(':ip - :username - [:date[clf]] :method :status :url - :response-time ms', {
      stream: fs.createWriteStream(`logs/access.log`, { flags: 'a' }),
      skip: (req) => req.method === 'OPTIONS' || req.method === 'GET',
    }),
  );

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  if (devEnv()) app.use(bodyParser.urlencoded({ extended: true })); // For postman

  app.use(routes());

  app.use((req: Request, res: Response) => notFound(res));

  server.listen(process.env.APP_PORT, () => {
    log.info(`Node environment: ${process.env.NODE_ENV}`);
    log.info(`Listening on ${process.env.APP_PORT}...`);
  });

  await monitorInternetConnection(io);
})();
