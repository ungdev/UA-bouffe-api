import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default () => (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get('authorization');

  if (!authorization) {
    return res
      .status(401)
      .json({ error: 'UNAUTHENTICATED' })
      .end();
  }

  const token = authorization.split(' ')[1];

  try {
    jwt.verify(token, process.env.APP_TOKEN_SECRET);
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'INVALID_TOKEN' })
      .end();
  }
};
