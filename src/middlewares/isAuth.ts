import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import getToken from '../utils/getToken';

export default () => (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getToken(req);

    if (token) {
      jwt.verify(token, process.env.APP_TOKEN_SECRET);
      return next();
    }

    return res
      .status(401)
      .json({ error: 'UNAUTHENTICATED' })
      .end();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'INVALID_TOKEN' })
      .end();
  }
};
