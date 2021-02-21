import { Router } from "express";
import DogController from "../controllers/dog.controller";
import auth from "../middlewares/auth/key.authorization";
import validation from "../middlewares/validators/dog/dog.validation";
const router = Router();

function dogRouter(app) {
  app.use("/dogs", router);

  router.use(auth.authorization);
  router.get("/", DogController.getDog);
  router.post("/:dogId/meals", validation.eatValidation, DogController.feedDog);
  router.post("/:dogId/snacks", validation.eatValidation, DogController.snackDog);
  router.put("/:dogId", validation.dogValidation, DogController.updateDog);
}

export default dogRouter;
