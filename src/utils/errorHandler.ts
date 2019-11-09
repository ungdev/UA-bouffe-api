import { Response } from 'express';
import { Error as ErrorType } from '../types';
import log from './log';

const errorHandler = (res: Response, err: Error) => {
  switch (err.name) {
    case 'TokenExpiredError':
      return res
        .status(401)
        .json({ error: ErrorType.EXPIRED_TOKEN })
        .end();

    case 'JsonWebTokenError':
      return res
        .status(401)
        .json({ error: ErrorType.INVALID_TOKEN })
        .end();

    default:
      log.error(err);
      return res
        .status(500)
        .json({ error: 'UNKNOWN' })
        .end();
  }
};

export default errorHandler;
