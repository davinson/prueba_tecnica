import "dotenv/config";

export const config = {
  port: process.env.PORT,
  db_host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  secret: process.env.JWT_SECRET,
};
