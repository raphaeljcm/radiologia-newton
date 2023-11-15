import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { queryDatabase } from '../db';
import { compare } from 'bcrypt';
import { UserLogin } from '../types';
import * as messages from '../constants/messages';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const users = await queryDatabase(
      'SELECT * FROM users u WHERE u.email = ?',
      [email],
    );

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ error: messages.INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE });
    }

    const user = users[0] as UserLogin;

    const match = await compare(password, user.password);

    if (!match) {
      return res
        .status(404)
        .json({ error: messages.INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE });
    }

    const token = jwt.sign({}, process.env.JWT_SECRET!, {
      subject: String(user.id),
      expiresIn: '1d',
    });

    const tokenReturn = {
      token,
      user: {
        email: user.email,
        name: user.name,
        image: user.image ? user.image.toString('base64') : null,
      },
    };

    await queryDatabase(`UPDATE users SET last_access = NOW() WHERE id = ?;`, [
      user.id,
    ]);

    return res.json(tokenReturn);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server ERROR.' });
  }
}
