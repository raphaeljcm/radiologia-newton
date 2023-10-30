import { NextFunction, Request, Response } from 'express';
import { connection } from '../db';
import jwt from 'jsonwebtoken';

type User = {
  id: number;
  name: string;
  password: string;
  ra: string;
  email: string;
  userType: string;
  image: Buffer;
  creationDate: Date;
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  
  // check if user exists
  connection.query(`
    SELECT * FROM users u WHERE u.email = ?
  `, [email], (err, result) => {
    
    if (err) {
      return res.status(500).json({error: 'Error while executing query'});
    }
    
    const user = result as User[];

    if (user.length === 0) {
      res.status(404).json({error: 'Email or password invalid!'});
    }
    
    if (password !== user[0].password) {
      res.status(404).json({error: 'Email or password invalid!'});
    }

    // generate jwt token
    const token = jwt.sign({}, process.env.JWT_SECRET!, {
      subject: String(user[0].id),
      expiresIn: '1d',
    });
    
    const tokenReturn = {
      token,
      user: {
        email: user[0].email
      } 
    };

    connection.query(`
      UPDATE users
      SET last_access = NOW()
      WHERE id = ?;
      `, [user[0].id]);

    return res.json(tokenReturn);
  });
}
