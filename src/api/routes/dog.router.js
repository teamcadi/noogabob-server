import { Router } from "express";
import DogController from "../controllers/dog.controller";
import auth from "../middlewares/auth/key.authorization";
import validation from "../middlewares/validators/dog/dog.validation";
const router = Router();

function dogRouter(app) {
  app.use("/dogs", router);

  router.get("/", auth.authorization, DogController.getDog);
  router.post("/:dogId/meals", auth.authorization, validation.eatValidation, DogController.feedDog);
  router.post("/:dogId/snacks", auth.authorization, validation.eatValidation, DogController.snackDog);
  router.put("/:dogId", auth.authorization, validation.dogValidation, DogController.updateDog);
}

export default dogRouter;
