import { Request, Response } from 'express';
import { unauthenticated, success } from '../../utils/responses';
import generateToken from '../../utils/generateToken';
import { Error } from '../../types';
import getUsers from '../../utils/users';
import errorHandler from '../../utils/errorHandler';
import { getCurrentInternetStatus } from '../../sockets/notifyNetworkStatus';

export default () => async (req: Request, res: Response) => {
  try {
    const { pin } = req.body;

    const users = await getUsers();
    const loggedUser = users.find((_user) => pin === process.env[`APP_PIN_${_user.key.toUpperCase()}`]);

    if (!loggedUser) {
      return unauthenticated(res, Error.INVALID_PIN);
    }

    return success(res, {
      token: generateToken(loggedUser.name, loggedUser.key, loggedUser.permissions),
      name: loggedUser.name,
      key: loggedUser.key,
      isOnline: getCurrentInternetStatus(),
    });
  } catch (err) {
    return errorHandler(res, err);
  }
};
