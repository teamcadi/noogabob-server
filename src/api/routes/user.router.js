import { Router } from "express";
const router = Router();

function userRouter(app) {
  app.use("/users", router);

  router.get("/:userId", (req, res) => {});
  router.put("/:userId", (req, res) => {});
  router.delete("/:userId", (req, res) => {});
}

export default userRouter;
