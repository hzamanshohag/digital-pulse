import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  database_url: process.env.Database_Url,
  port: process.env.Port,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
};
