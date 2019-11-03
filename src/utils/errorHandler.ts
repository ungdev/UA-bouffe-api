import { Request, Response } from 'express';

const errorHandler = (err: any, res: Response) => {
  console.error(err);
  return res
    .status(500)
    .json({ error: 'UNKNOWN' })
    .end();
};

const notFound = (req: Request, res: Response) => res
  .status(404)
  .json({ error: 'NOT_FOUND' })
  .end();

export default errorHandler;
export { notFound };