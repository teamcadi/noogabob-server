import { Router } from "express";
import UserController from "../controllers/user.controller";
import { userValidation } from "../middlewares/validators/user/user.validation";
import { authorization } from "../middlewares/auth/key.authorization";
const router = Router();

function userRouter(app) {
  app.use("/users", router);

  // todo: auth, validator
  router.post("/", authorization, userValidation, UserController.postUser);
  router.get("/:userId", authorization, UserController.getUser);
  router.put("/:userId", authorization, userValidation, UserController.updateUser);
  router.delete("/:userId", authorization, UserController.deleteUser);
}

export default userRouter;
