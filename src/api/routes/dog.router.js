import { Router } from "express";
import DogController from "../controllers/dog.controller";
import authorization from "../middlewares/auth/key.authorization";
import validation from "../middlewares/validators/dog/dog.validation";
const router = Router();

function dogRouter(app) {
  app.use("/dogs", router);

  router.get("/", authorization, DogController.getDog);
  router.post("/:dogId/meals", authorization, validation.eatValidation, DogController.feedDog);
  router.post("/:dogId/snacks", authorization, validation.eatValidation, DogController.snackDog);
  router.put("/:dogId", authorization, validation.dogValidation, DogController.updateDog);
}

export default dogRouter;
