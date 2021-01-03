import { Router } from "express";
const router = Router();

function dogsRouter(app) {
  app.use("/dogs", router);

  router.post("/", (req, res) => {});
  router.post("/:dogId/meal", (req, res) => {});
  router.post("/:dogId/snack", (req, res) => {});
  router.put("/:dogId/:id", (req, res) => {});
}

export default dogsRouter;
