import { Router } from "express";
import GroupController from "../controllers/group.controller";
import { dogImageUpload } from "../middlewares/multer/dog.multer";
import { groupValidation, staticValidation } from "../middlewares/validators/group/group.validation";
import { authorization } from "../middlewares/auth/key.authorization";
const router = Router();

function groupRouter(app) {
  app.use("/groups", router);

  router.post("/", groupValidation, GroupController.createGroup);
  router.get("/:groupId", authorization, GroupController.getGroup);
  router.get("/:groupId/members", authorization, GroupController.getMembers);
  router.get("/:groupId/statics", staticValidation, authorization, GroupController.getStatics);
  router.post("/:groupId/album", authorization, dogImageUpload, GroupController.postAlbum);
  router.get("/:groupId/album", authorization, GroupController.getAlbum);
  router.get("/:groupId/timeline", authorization, GroupController.getTimeline);
}

export default groupRouter;
