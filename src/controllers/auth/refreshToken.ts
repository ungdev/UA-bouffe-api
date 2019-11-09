import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import generateToken from '../../utils/generateToken';
import { Token } from '../../types';

export default () => (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, process.env.APP_TOKEN_SECRET) as Token;

    return res
      .status(200)
      .json({
        token: generateToken(decoded.name, decoded.key, decoded.permissions),
        name: decoded.name,
        key: decoded.key,
      })
      .end();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'INVALID_TOKEN' })
      .end();
  }
};
