import express from "express";
import config from "./configs";
import loader from "./loaders";

(async () => {
  const app = express();
  const port = config.port;

  // loader
  await loader(app);

  // port binding
  app.listen(port, (err) => {
    if (err) {
      //   console.error(err);
      console.error(err.message);
      process.exit(1);
    } else console.log("서버 실행중");
  });
})();
