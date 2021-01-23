import { Router } from "express";
const router = Router();

function dogRouter(app) {
  app.use("/dogs", router);

  router.post("/", DogController.postDog);
  router.post("/:dogId/meals", DogController.feedDog);
  router.post("/:dogId/snacks", DogController.snackDog);
  router.put("/:dogId/:id", DogController.updateDog);
}

export default dogRouter;
