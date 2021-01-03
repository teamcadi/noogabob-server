import { Router } from "express";
const router = Router();

function userRouter(app) {
  app.use("/users", router);

  router.get("/", (req, res) => {});
}

export default userRouter;
