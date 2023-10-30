import express from 'express';
import cors from 'cors';
import { connection } from './db';
import { router } from './router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => {
  connection.connect(err => {
    if (err) {
      console.log('Error connecting to database');
      throw new Error(err.message);
    }

    console.log('Connected to database');
  });

  console.log(`Server listening on port ${process.env.PORT}`);
});
