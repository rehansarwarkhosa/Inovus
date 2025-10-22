import jwt from 'jsonwebtoken';
import env from '../../env';

function generateAccessToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

function generateRefreshToken(payload) {
  const secret = env.REFRESH_TOKEN_SECRET || env.JWT_SECRET;
  return jwt.sign(payload, secret, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, env.JWT_SECRET);
}

function verifyRefreshToken(token) {
  const secret = env.REFRESH_TOKEN_SECRET || env.JWT_SECRET;
  return jwt.verify(token, secret);
}

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
