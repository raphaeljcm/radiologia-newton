import { NextFunction, Request, Response } from 'express';
import { connection } from '../db';
import jwt from 'jsonwebtoken';

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  
  connection.query(`SELECT * FROM users u WHERE u.email = ?`, [email], (err, result) => {
    
    if (err) {
      return res.status(500).json({error: 'Internal Server ERROR.'});
    }
    
    const user = result as User[];

    if (user.length === 0 || password !== user[0].password) {
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

    connection.query(`UPDATE users SET last_access = NOW() WHERE id = ?;`, [user[0].id]);

    return res.json(tokenReturn);
  });
}

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
