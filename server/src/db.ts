import { pool } from './app';

export async function queryDatabase(sql: string, values: any[] = []) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(sql, values);

    connection.release();

    return rows as any[];
  } catch (err) {
    console.error('Could not execute the query.');
    throw err;
  }
}
