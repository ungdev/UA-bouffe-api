import { Request, Response } from 'express';
import errorHandler from '../../utils/errorHandler';
import generateToken from '../../utils/generateToken';

export default () => (req: Request, res: Response) => {
  try {
    const { pin } = req.body;

    if (pin !== process.env.APP_PIN) {
      return res
        .status(400)
        .json({ error: 'INVALID_PIN' })
        .end();
    }

    return res
      .status(200)
      .json({ token: generateToken() })
      .end();
  }
  catch (err) {
    return errorHandler(err, res);
  }
};