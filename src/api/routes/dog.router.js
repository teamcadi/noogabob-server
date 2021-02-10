import { Router } from "express";
import DogController from "../controllers/dog.controller";
const router = Router();

function dogRouter(app) {
  app.use("/dogs", router);

  router.post("/:dogId/meals", DogController.feedDog);
  router.post("/:dogId/snacks", DogController.snackDog);
  router.put("/:dogId", DogController.updateDog);
}

export default dogRouter;
