import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import generateToken from '../../utils/generateToken';
import { Token } from '../../types';
import { success } from '../../utils/responses';
import errorHandler from '../../utils/errorHandler';

export default () => (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, process.env.APP_TOKEN_SECRET) as Token;

    return success(res, {
      token: generateToken(decoded.name, decoded.key, decoded.permissions),
      name: decoded.name,
      key: decoded.key,
    });
  } catch (err) {
    return errorHandler(res, err);
  }
};
