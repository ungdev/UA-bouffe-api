import { Request, Response, NextFunction } from 'express';
import hasPermission from './hasPermission';

export default () => (req: Request, res: Response, next: NextFunction) => {
  return hasPermission(null)(req, res, next);
};
