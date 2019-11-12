import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import getToken from '../utils/getToken';
import { Token, Permission } from '../types';
import { unauthorized, unauthenticated } from '../utils/responses';
import errorHandler from '../utils/errorHandler';

export default (permission: string) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getToken(req);
    if (token) {
      const decoded = jwt.verify(token, process.env.APP_TOKEN_SECRET) as Token;

      req.user = decoded;

      if (!permission) {
        return next();
      }

      if (decoded.permissions === permission || decoded.permissions === Permission.ADMIN) {
        return next();
      }
      return unauthorized(res);
    }

    return unauthenticated(res);
  } catch (err) {
    return errorHandler(res, err);
  }
};
