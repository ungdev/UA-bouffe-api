import { Request } from 'express';

const getToken = (req: Request) => {
  const authorization = req.get('authorization');

  if (!authorization) {
    return null;
  }

  return authorization.split(' ')[1];
};

export default getToken;
