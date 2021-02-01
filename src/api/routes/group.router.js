import { Router } from "express";
import GroupController from "../controllers/group.controller";
import { dogImageUpload } from "../middlewares/multer/dog.multer";
const router = Router();

function groupRouter(app) {
  app.use("/groups", router);

  router.post("/", GroupController.getKey);
  router.get("/:groupId/members", GroupController.getMembers);
  router.get("/:groupId/statics", GroupController.getStatics);
  router.post("/:groupId/album", dogImageUpload, GroupController.postAlbum);
  router.get("/:groupId/album", GroupController.getAlbum);
  router.get("/:groupId/timeline", GroupController.getTimeline);
}

export default groupRouter;
