import { Router } from "express";
const router = Router();

function groupRouter(app) {
  app.use("/groups", router);

  router.post("/", (req, res) => {});
}

export default groupRouter;
