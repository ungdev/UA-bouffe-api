import { Request, Response, NextFunction } from 'express';

const isLocalhost = (ip: string) => ip === '1' || ip === '127.0.0.1';

const isPrivate = (ip: string) => {
  const parts = ip.split('.');
  return (
    parts[0] === '10'
    || (parts[0] === '172' && (parseInt(parts[1], 10) >= 16 && parseInt(parts[1], 10) <= 31))
    || (parts[0] === '192' && parts[1] === '168')
  );
};

export default () => (req: Request, res: Response, next: NextFunction) => {
  const ip = (req.header('x-forwarded-for') || req.connection.remoteAddress).split(':');
  const ipv4 = ip[ip.length - 1];

  if (isLocalhost(ipv4) || isPrivate(ipv4)) {
    return next();
  }

  return res
    .status(403)
    .json({ error: 'NOT_IN_LOCAL_NETWORK' })
    .end();
};
