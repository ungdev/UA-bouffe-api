import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import generateToken from '../../utils/generateToken';

export default () => (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    jwt.verify(token, process.env.APP_TOKEN_SECRET);

    return res
      .status(200)
      .json({ token: generateToken() })
      .end();
  }
  catch (err) {
    return res
      .status(400)
      .json({ error: 'INVALID_TOKEN' })
      .end();
  }
};