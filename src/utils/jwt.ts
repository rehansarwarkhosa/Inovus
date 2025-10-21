import jwt from 'jsonwebtoken';
import { env } from '../../env';

export interface TokenPayload {
  userId: string;
  email: string;
  role?: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  const secret = env.REFRESH_TOKEN_SECRET || env.JWT_SECRET;
  return jwt.sign(payload, secret, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  const secret = env.REFRESH_TOKEN_SECRET || env.JWT_SECRET;
  return jwt.verify(token, secret) as TokenPayload;
};
