import express, { Request, Response } from 'express';
import http from 'http';
import socketio from 'socket.io';
import fs from 'fs';
import { config, parse } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import database from './database';
import { notFound } from './utils/responses';
import routes from './controllers';
import restricLocalIP from './middlewares/restricLocalIP';
import log from './utils/log';
import devEnv from './utils/devEnv';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const dotenvInit = () => {
  config();
  const envConfig = parse(fs.readFileSync('.env'));

  // Override NODE_ENV from .env (In dotenv, variables that are already set will not be overwritten)
  if (envConfig.NODE_ENV) {
    process.env.NODE_ENV = envConfig.NODE_ENV;
  }
};

dotenvInit();

(async () => {
  await database();

  app.locals.io = io;

  app.use(morgan(devEnv() ? 'dev' : 'combined'));

  morgan.token('username', (req) => (req.user ? req.user.key : 'anonymous'));
  app.use(
    morgan(':remote-addr - :username - [:date[clf]] :method :status :url - :response-time ms', {
      stream: fs.createWriteStream(`${process.env.APP_PATH_LOGS}/access.log`, { flags: 'a' }),
      skip: (req) => req.method === 'OPTIONS',
    }),
  );

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  if (devEnv()) app.use(bodyParser.urlencoded({ extended: true })); // For postman

  app.use(restricLocalIP());
  app.use(routes());

  app.use((req: Request, res: Response) => notFound(res));

  server.listen(process.env.APP_PORT, () => {
    log.info(`Node environment: ${process.env.NODE_ENV}`);
    log.info(`Listening on ${process.env.APP_PORT}...`);
  });
})();
