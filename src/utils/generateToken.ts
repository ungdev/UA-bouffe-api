import jwt from 'jsonwebtoken';

const generateToken = () =>
  jwt.sign({}, process.env.APP_TOKEN_SECRET, {
    expiresIn: process.env.APP_TOKEN_EXPIRES,
  });

export default generateToken;
