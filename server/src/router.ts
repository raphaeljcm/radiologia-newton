import { Router } from 'express';
import { login } from './controllers/login';

export const router = Router();

router.get('/', () => console.log('Hello world!'));

router.post('/login', login);
