import { Request } from 'express';

const getToken = (req: Request) => {
  const authorization = req.get('authorization');

  if (!authorization) {
    return null;
  }

  const token = authorization.split(' ')[1];

  return token;
};

export default getToken;
