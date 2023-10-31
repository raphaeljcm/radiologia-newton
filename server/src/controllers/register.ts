import { Request, Response } from 'express';
import { queryDatabase } from '../db';

class User {
  name: string;
  password: string;
  ra: string;
  email: string;
  userType = 'default';
  image: Buffer;
  creationDate: Date = new Date();

  constructor(
    name: string,
    password: string,
    ra: string,
    email: string,
    image: Buffer,
  ) {
    this.name = name;
    this.password = password;
    this.email = email;
    this.ra = ra;
    this.image = image;
  }
}

enum UserType {
  DEFAULT = 1,
  ADMIN,
}

const USER_NAME_MAX_LENGTH = 100;
const RA_LENGTH = 8;
const MIN_PASSWORD_LENGTH = 6;

export async function register(req: Request, res: Response) {
  const { name, password, ra, email, image } = req.body;

  try {
    const users = await queryDatabase('SELECT * FROM users u WHERE u.ra = ?', [
      ra,
    ]);

    if (!users || users.length > 0) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const missingFields: string[] = [];

    if (!name) missingFields.push('name');
    if (!password) missingFields.push('password');
    if (!ra) missingFields.push('ra');
    if (!email) missingFields.push('email');

    if (missingFields.length > 0) {
      const errorMessage =
        missingFields.length === 1
          ? `Field '${missingFields[0]}' is mandatory.`
          : `Fields [${missingFields.join(', ')}] are mandatories.`;

      return res.status(400).json({ error: errorMessage });
    }

    if (name.length > USER_NAME_MAX_LENGTH) {
      return res
        .status(400)
        .json({ error: 'Name size must not be greater than 100.' });
    }

    if (ra.length !== RA_LENGTH) {
      return res.status(400).json({ error: 'RA size must be 8.' });
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return res
        .status(400)
        .json({ error: 'Password size must have at least 6 characters.' });
    }

    const user = new User(name, password, ra, email, image);

    await queryDatabase(
      `INSERT INTO users (name, password, ra, email, user_type_id, created_at, last_access, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.name,
        user.password,
        user.ra,
        user.email,
        UserType.DEFAULT,
        user.creationDate,
        null,
        user.image,
      ],
    );

    res.status(201).send();
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server ERROR.' });
  }
}
