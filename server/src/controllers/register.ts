import { Request, Response } from 'express';
import { connection } from '../db';

export async function register(req: Request, res: Response) {
  const { name, password, ra, email, image } = req.body;

  connection.query(`SELECT * FROM users u WHERE u.ra = ?`, [ra], (err, result) => {
    if (err) {
      return res.status(500).json({error: 'Internal Server ERROR.'});
    }
    
    const foundUsers = result as User[];

    if (foundUsers.length > 0) {
      return res.status(400).json({error: 'User already exists.'});
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
      return res.status(400).json({ error: 'Name size must not be greater than 100.' });
    }
  
    if (ra.length !== RA_LENGTH) {
      return res.status(400).json({ error: 'RA size must be 8.' });
    }
  
    if (password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({ error: 'Password size must have at least 6 characters.' });
    }
  
    const user = new User(name, password, ra, email, image);
    
    connection.query(`
      INSERT INTO users (name, password, ra, email, user_type_id, created_at, last_access, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [user.name, user.password, user.ra, user.email, UserType.DEFAULT, user.creationDate, null, user.image]);
    
    res.status(201).send();
  });
}

const USER_NAME_MAX_LENGTH = 100;
const RA_LENGTH = 8;
const MIN_PASSWORD_LENGTH = 6;

class User {
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