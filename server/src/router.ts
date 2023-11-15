import multer from 'multer';
import { Router } from 'express';
import { login } from './controllers/login';
import { register } from './controllers/register';
import { getImages } from './controllers/getImages';
import { getUserById } from './controllers/getUserById';
import { updateUserById } from './controllers/updateUserById';
import { ensureAuth } from './middlewares/ensureAuth';

export const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/login', login);

router.post('/register', upload.array('files'), register);

router.get('/images', ensureAuth, getImages);

router.get('/users/:id', ensureAuth, getUserById);

router.put('/users/:id', ensureAuth, upload.array('files'), updateUserById);
