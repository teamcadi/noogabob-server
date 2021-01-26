import dotenv from "dotenv";
import dbConfig from "./database.config";
import jwtConfig from "./jwt.config";

const env = dotenv.config();
if (env.error) throw new Error("env 없음");

const config = {
  db: { ...dbConfig },
  dbSchema: process.env.DB_SCHEMA,
  jwt: { ...jwtConfig },
  port: process.env.PORT,
  prefix: process.env.ROUTE_PREFIX,
  nodeEnv: process.env.NODE_ENV,
  hostname: process.env.HOSTNAME,
  FieldName: "image",
};

export default config;
