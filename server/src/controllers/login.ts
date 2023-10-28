import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  // check if user exists

  // check if password is correct

  // generate jwt token
  const token = jwt.sign({}, process.env.JWT_SECRET!, {
    subject: 'random-user-id',
    expiresIn: '1d',
  });

  return res.json({ token, user: { name: 'Random user' } }).status(200);
}
