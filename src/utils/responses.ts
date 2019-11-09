import { Response } from 'express';
import { Error } from '../types';

const success = (res: Response, body: object) =>
  res
    .status(200)
    .json(body)
    .end();

const created = (res: Response, body?: object) => {
  if (body) {
    return res
      .status(201)
      .json(body)
      .end();
  }

  return res.status(201).end();
};

const noContent = (res: Response) => res.status(204).end();

const badRequest = (res: Response, type?: Error) =>
  res
    .status(400)
    .json({ error: type || Error.BAD_REQUEST })
    .end();

const unauthenticated = (res: Response, type?: Error) =>
  res
    .status(401)
    .json({ error: type || Error.UNAUTHENTICATED })
    .end();

const unauthorized = (res: Response, type?: Error) =>
  res
    .status(403)
    .json({ error: type || Error.UNAUTHORIZED })
    .end();

const notFound = (res: Response, type?: Error) =>
  res
    .status(404)
    .json({ error: type || Error.NOT_FOUND })
    .end();

export { success, created, noContent, badRequest, unauthenticated, unauthorized, notFound };
