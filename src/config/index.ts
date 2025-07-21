import dotenv from 'dotenv'

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const config = {
  PORT: process.env.PORT,
  BASE_URL: process.env.HOST,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  }
 
}

export default config;
