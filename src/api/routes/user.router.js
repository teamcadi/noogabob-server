import { Router } from "express";
import UserController from "../controllers/user.controller";
const router = Router();

function userRouter(app) {
  app.use("/users", router);

  // todo: auth, validator
  router.post("/", UserController.postUser);
  router.get("/:userId", UserController.getUser);
  router.put("/:userId", UserController.updateUser);
  router.delete("/:userId", UserController.deleteUser);
}

export default userRouter;
