import { Router } from 'express';
import login from './login';
import refreshToken from './refreshToken';

export default () => {
  const router = Router();

  router.post('/login', login());
  router.post('/refreshToken', refreshToken());

  return router;
};