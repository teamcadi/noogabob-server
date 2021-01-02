import express from "express";
import config from "./configs";
import loader from "./loaders";
import { logger } from "./utils/logger";

(async () => {
  const app = express();
  const port = config.port;

  // loader
  await loader(app);

  // port binding
  app.listen(port, (err) => {
    if (err) {
      logger.error(err.toString());
      process.exit(1);
    } else {
      logger.info(`Sever listening on port ${port}`);
    }
  });
})();
