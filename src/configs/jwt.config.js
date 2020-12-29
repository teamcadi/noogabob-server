import dotenv from "dotenv";
dotenv.config();

const jwtConfig = {
  secret: process.env.JWT_SECRET,
};

export default jwtConfig;
