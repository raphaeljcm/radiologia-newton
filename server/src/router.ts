import { Request, Response, Router } from 'express';
import { login } from './controllers/login';

export const router = Router();

router.get('/', (req: Request, res: Response) => res.send('Hello World'));

router.post('/login', login);
