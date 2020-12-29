import { Router } from "express";
const router = Router();

function userRouter(app) {
  app.use("/user", router);

  router.get("/", (req, res) => {
    res.send("user");
  });
}

export default userRouter;
