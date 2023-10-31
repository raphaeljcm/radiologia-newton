import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { queryDatabase } from '../db';

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

    const users = await queryDatabase('SELECT * FROM users u WHERE u.id = ?', [
      sub,
    ]);

    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
