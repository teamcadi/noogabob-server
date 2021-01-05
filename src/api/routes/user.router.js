import { Router } from "express";
import UserController from "../controllers/user.controller";
const router = Router();

function userRouter(app) {
  app.use("/users", router);

  // todo: auth, validator
  router.get("/:userId", UserController.getUser);
  router.put("/:userId", (req, res) => {});
  router.delete("/:userId", (req, res) => {});
}

export default userRouter;
