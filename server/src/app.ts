import express from 'express';
import { connection } from './db';
import { router } from './router';

const app = express();

app.use(express.json());
app.use(router);

app.listen(
  {
    port: process.env.PORT,
    host: '0.0.0.0',
  },
  () => {
    connection.connect(err => {
      if (err) {
        console.log('Error connecting to database');
        throw new Error(err.message);
      }

      console.log('Connected to database');
    });

    console.log(`Server listening on port ${process.env.PORT}`);
  },
);
