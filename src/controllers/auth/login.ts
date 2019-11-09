import { Request, Response } from 'express';
import { compareSync } from 'bcrypt';
import { unauthenticated, success } from '../../utils/responses';
import generateToken from '../../utils/generateToken';
import User from '../../models/user';
import { Error } from '../../types';
import errorHandler from '../../utils/errorHandler';

export default () => async (req: Request, res: Response) => {
  try {
    const { pin } = req.body;

    const users = await User.findAll();

    const user = users.find((_user) => compareSync(pin, _user.password));

    if (!user) {
      return unauthenticated(res, Error.INVALID_PIN);
    }

    return success(res, {
      token: generateToken(user.name, user.key, user.permissions),
      name: user.name,
      key: user.key,
    });
  } catch (err) {
    return errorHandler(res, err);
  }
};
