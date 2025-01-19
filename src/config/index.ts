import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  database_url: process.env.Database_Url,
  port: process.env.Port,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
};
