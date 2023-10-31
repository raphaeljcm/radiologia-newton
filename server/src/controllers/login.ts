import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { queryDatabase } from '../db';

type User = {
  id: number;
  name: string;
  password: string;
  ra: string;
  email: string;
  userType: string;
  image: Buffer;
  creationDate: Date;
};

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const users = await queryDatabase(
      'SELECT * FROM users u WHERE u.email = ?',
      [email],
    );

    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'Email or password invalid!' });
    }

    const user = users[0] as User;

    if (password !== user.password) {
      return res.status(404).json({ error: 'Email or password invalid!' });
    }

    const token = jwt.sign({}, process.env.JWT_SECRET!, {
      subject: String(user.id),
      expiresIn: '1d',
    });

    const tokenReturn = {
      token,
      user: {
        email: user.email,
      },
    };

    await queryDatabase(`UPDATE users SET last_access = NOW() WHERE id = ?;`, [
      user.id,
    ]);

    return res.json(tokenReturn);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server ERROR.' });
  }
}
