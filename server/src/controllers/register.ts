import { Request, Response } from 'express';
import { connection } from '../db';

export async function register(req: Request, res: Response) {
  const { name, password, ra, email, image } = req.body;
  const missingFields = [];

  if (name === null) {
    missingFields.push('name');
  }

  if (password === null) {
    missingFields.push('password');
  }

  if (ra === null) {
    missingFields.push('ra');
  }

  if (email === null) {
    missingFields.push('email');
  }

  if (missingFields.length > 0) {
    const errorMessage =
      missingFields.length === 1
        ? `O campo '${missingFields[0]}' não pode ser nulo.`
        : `Os campos [${missingFields.join(', ')}] não podem ser nulos.`;

    return res.status(400).json({ error: errorMessage });
  }

  const user = new User(name, password, ra, email, image);
  
  connection.query(`
    INSERT INTO users (name, password, ra, email, user_type_id, created_at, last_access, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [user.name, user.password, user.ra, user.email, UserType.DEFAULT, user.creationDate, user.creationDate, user.image]);
  
  res.status(201).send();
}

export class User {
  name: string;
  password: string;
  ra: string;
  email: string;
  userType: string = "default";
  image: Buffer;
  creationDate: Date = new Date();

  constructor(name: string, password: string, ra: string, email: string, image: Buffer) {
    this.name = name;
    this.password = password;
    this.email = email;
    this.ra = ra;
    this.image = image;
  }
}

enum UserType {
  DEFAULT = 1,
  ADMIN
}