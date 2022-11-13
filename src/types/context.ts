import { Response, Request } from 'express';
import { User } from '../schema/user.schema';
export interface Context {
  req: Request;
  res: Response;
  userId: User['password'];
}
