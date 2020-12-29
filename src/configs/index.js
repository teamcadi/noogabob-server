import dotenv from "dotenv";
import dbConfig from "./database.config";
import jwtConfig from "./jwt.config";

const env = dotenv.config();
if (env.error) throw new Error("env 없음");

const config = {
  db: { ...dbConfig },
  jwt: { ...jwtConfig },
  port: process.env.PORT,
  prefix: process.env.PREFIX,
};

export default config;
