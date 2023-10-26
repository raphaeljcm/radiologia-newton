import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.listen(3333, () => console.log('Server running on port: 3333'));
