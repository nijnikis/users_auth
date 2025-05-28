import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  secret: string;
  dbUser: string;
  dbPass: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  secret: process.env.SECRET_KEY ||  '',
  dbUser: process.env.DB_USER ||  '',
  dbPass: process.env.DB_PASSWORD ||  '',
};

export default config;
