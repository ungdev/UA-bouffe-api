import jwt from 'jsonwebtoken';

const generateToken = () => jwt.sign(
  { turbobouffe: 'ARENA4EVER' },
  process.env.APP_TOKEN_SECRET,
  {
    expiresIn: process.env.APP_TOKEN_EXPIRES,
  },
);

export default generateToken;