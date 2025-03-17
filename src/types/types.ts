import { Request } from 'express';

export interface JwtPayload {
  username: string;
  id: number;
  iat: number;
}
export interface RequestWithUser extends Request {
  user: JwtPayload;
}
