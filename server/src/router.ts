import multer from 'multer';
import { Request, Response, Router } from 'express';
import { login } from './controllers/login';
import { register } from './controllers/register';
import { getImages } from './controllers/getImages';
import { ensureAuth } from './middlewares/ensureAuth';

export const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', (req: Request, res: Response) => res.send('Hello World'));

router.post('/login', login);

router.post('/register', upload.array('files'), register);

router.get('/testAuth', ensureAuth, (req: Request, res: Response) =>
  res.send('auth is working'),
);

router.get('/images', ensureAuth, getImages);
