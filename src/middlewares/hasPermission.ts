import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import getToken from '../utils/getToken';
import errorHandler from '../utils/errorHandler';
import { Token } from '../types';

export default (permission: string) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getToken(req);

    if (token) {
      const decoded = jwt.verify(token, process.env.APP_TOKEN_SECRET) as Token;

      if (decoded.permissions === permission || decoded.permissions === 'admin') {
        return next();
      }
      return res
        .status(403)
        .json({ error: 'UNAUTHORIZED' })
        .end();
    }

    return res
      .status(401)
      .json({ error: 'UNAUTHENTICATED' })
      .end();
  } catch (err) {
    errorHandler(err, res);
  }
};
