import { Request, Response, Router } from 'express';
import { login } from './controllers/login';
import { register } from './controllers/register';

export const router = Router();

router.get('/', (req: Request, res: Response) => res.send('Hello World'));

router.post('/login', login);

router.post('/api/register', register);