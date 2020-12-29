import { json, urlencoded } from "express";
import routes from "../api/routes";
import config from "../configs";

function expressLoader(app) {
  // application level middleware
  app.use(json());
  app.use(urlencoded({ extended: true }));

  // routes
  app.use(config.prefix, routes());

  // error handling
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ success: false, message: err.message });
  });
}

export default expressLoader;
