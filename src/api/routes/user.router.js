import { Router } from "express";
import UserController from "../controllers/user.controller";
import validates from "../middlewares/validators/user/user.validation";
import auth from "../middlewares/auth/key.authorization";
const router = Router();

function userRouter(app) {
  app.use("/users", router);
  router.use(auth.authorization);
  router.post("/", validates.userValidation, UserController.postUser);
  router.get("/:userId", UserController.getUser);
  router.put("/:userId", validates.userValidation, UserController.updateUser);
  router.delete("/:userId", UserController.deleteUser);
}

export default userRouter;
