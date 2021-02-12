import { Router } from "express";
import DogController from "../controllers/dog.controller";
import { authorization } from "../middlewares/auth/key.authorization";
import { eatValidation, dogValidation } from "../middlewares/validators/dog/dog.validation";
const router = Router();

function dogRouter(app) {
  app.use("/dogs", router);

  router.post("/:dogId/meals", authorization, eatValidation, DogController.feedDog);
  router.post("/:dogId/snacks", authorization, eatValidation, DogController.snackDog);
  router.put("/:dogId", authorization, dogValidation, DogController.updateDog);
}

export default dogRouter;
