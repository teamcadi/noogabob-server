import { json, urlencoded } from "express";
import morgan from "morgan";
import routes from "../api/routes";
import config from "../configs";
import { logger } from "../utils/logger";

/**
 * @description express framework 셋팅
 * @param {*} app express application
 */
function expressLoader(app) {
  // application level middleware
  app.use(morgan("dev"));
  app.use(json());
  app.use(urlencoded({ extended: true }));

  // routes
  app.use(config.prefix, routes());
  app.use("/favicon.ico", (req, res) => res.status(204));
  app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });

  // error handling
  // todo: 데이터베이스 에러 핸들링
  app.use((err, req, res, next) => {
    logger.error(err);
    if (err.errno == 1062) rs.status(409).json({ success: false, message: "데이터 중복" });
    else res.status(err.status || 500).json({ success: false, message: err.message });
  });
}

export default expressLoader;
