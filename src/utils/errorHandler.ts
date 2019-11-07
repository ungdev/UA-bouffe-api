import { Request, Response } from 'express';
import log from './log';

const errorHandler = (err: Error, res: Response) => {
  log.error(err);
  return res
    .status(500)
    .json({ error: 'UNKNOWN' })
    .end();
};

const notFound = () => (req: Request, res: Response) =>
  res
    .status(404)
    .json({ error: 'NOT_FOUND' })
    .end();

export default errorHandler;
export { notFound };
