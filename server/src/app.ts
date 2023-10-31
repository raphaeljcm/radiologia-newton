import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { router } from './router';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

(async () => {
  try {
    await pool.getConnection();

    console.log('Database connection pool successfully established.');

    app.listen(process.env.PORT, () => {
      console.log(`Express server is running on port ${process.env.PORT}`);
    });
  } catch {
    console.error('Failed to establish the database connection pool:');
  }
})();
