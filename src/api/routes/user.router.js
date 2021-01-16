import { Router } from "express";
import UserController from "../controllers/user.controller";
const router = Router();

function userRouter(app) {
  app.use("/users", router);

  // todo: auth, validator
  router.get("/:userId", UserController.getUser);
  router.put("/:userId", UserController.putUser);
  router.delete("/:userId", UserController.deleteUser);
}

export default userRouter;
