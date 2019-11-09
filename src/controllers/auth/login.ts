import { Request, Response } from 'express';
import { compareSync } from 'bcrypt';
import errorHandler from '../../utils/errorHandler';
import generateToken from '../../utils/generateToken';
import User from '../../models/user';

export default () => async (req: Request, res: Response) => {
  try {
    const { pin } = req.body;

    const users = await User.findAll();

    const user = users.find((_user) => compareSync(pin, _user.password));

    if (!user) {
      return res
        .status(400)
        .json({ error: 'INVALID_PIN' })
        .end();
    }

    return res
      .status(200)
      .json({ token: generateToken(user.name, user.key, user.permissions), name: user.name, key: user.key })
      .end();
  } catch (err) {
    return errorHandler(err, res);
  }
};
