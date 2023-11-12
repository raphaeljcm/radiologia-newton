import { Request, Response, Router, urlencoded } from 'express';
import { login } from './controllers/login';
import { register } from './controllers/register';
import { getImages } from './controllers/getImages';
import { ensureAuth } from './middlewares/ensureAuth';

export const router = Router();

router.get('/', (req: Request, res: Response) => res.send('Hello World'));

router.post('/login', login);

router.post('/register', register);

router.get('/testAuth', ensureAuth, (req: Request, res: Response) =>
  res.send('auth is working'),
);

router.get('/images', ensureAuth, getImages);
