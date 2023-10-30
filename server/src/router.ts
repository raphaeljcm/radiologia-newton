import { Router } from 'express';
import { login } from './controllers/login';
import { register } from './controllers/register';

export const router = Router();

router.get('/', () => console.log('Hello world!'));

router.post('/login', login);

router.post('/api/register', register);