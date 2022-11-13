import { Response, Request } from 'express';
import { UserFromToken } from '../utils/jwt';
export interface Context {
  req: Request;
  res: Response;
  user: UserFromToken | null;
}
