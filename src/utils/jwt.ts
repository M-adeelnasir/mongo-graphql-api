import jwt, { SignOptions } from 'jsonwebtoken';

export const jwtSign = async (
  user: Object,
  options?: SignOptions | undefined
) => {
  const token = await jwt.sign(user, process.env.JWT_PRIVATE_KEY!, {
    ...(options && options),
    algorithm: 'RS256',
  });
  return token;
};

export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY!) as T;
    return decoded;
  } catch (err) {
    return null;
  }
}
