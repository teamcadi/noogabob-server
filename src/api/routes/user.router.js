import { Router } from "express";
import UserController from "../controllers/user.controller";
import validates from "../middlewares/validators/user/user.validation";
import auth from "../middlewares/auth/key.authorization";
const router = Router();

function userRouter(app) {
  app.use("/users", router);
  router.post("/", auth.authorization, validates.userValidation, UserController.postUser);
  router.get("/:userId", auth.authorization, UserController.getUser);
  router.put("/:userId", auth.authorization, validates.userValidation, UserController.updateUser);
  router.delete("/:userId", auth.authorization, UserController.deleteUser);
}

export default userRouter;
