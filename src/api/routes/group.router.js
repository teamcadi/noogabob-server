import { Router } from "express";
import GroupController from "../controllers/group.controller";
const router = Router();

function groupRouter(app) {
  app.use("/groups", router);

  router.post("/", GroupController.getKey);
  router.get("/:groupId/members", (req, res) => {});
  router.get("/:groupId/statics", (req, res) => {});
  router.post("/:groupId/album", (req, res) => {});
  router.get("/:groupId/timeline", (req, res) => {});
}

export default groupRouter;
