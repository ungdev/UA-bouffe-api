import { Request, Response } from 'express';
import { unauthenticated, success } from '../../utils/responses';
import generateToken from '../../utils/generateToken';
import { Error } from '../../types';
import users from '../../utils/users';
import errorHandler from '../../utils/errorHandler';

export default () => async (req: Request, res: Response) => {
  try {
    const { pin } = req.body;

    const user = users.find((_user) => pin === process.env[`APP_PIN_${_user.key.toUpperCase()}`]);

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
