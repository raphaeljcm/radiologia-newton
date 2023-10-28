import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export async function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET!);

    // check if user exists

    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
