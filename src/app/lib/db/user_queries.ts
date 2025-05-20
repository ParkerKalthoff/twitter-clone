import { query } from './pool';

export const userCount = async () => {
  const res = await query('SELECT COUNT(*) FROM users');
  return res.rows;
};

export const getUserByEmail = async (email: string) => {
  const res = await query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0]; // likely you only want the one user
};
