import dotenv from "dotenv"
dotenv.config();

export const env = {
  HOSTNAME: process.env['HOSTNAME'] || 'localhost',
  PORT: process.env['PORT'] || '3000',
  PG_USERNAME: process.env['PG_USERNAME'] || 'postgres',
  PG_PASSWORD: process.env['PG_PASSWORD'] || 'password',
  PG_DATABASE: process.env['PG_DATABASE'] || 'default_db',
} 

