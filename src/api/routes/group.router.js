import { staticValidation } from "../middlewares/validators/group/group.validation";
import { dogImageUpload } from "../middlewares/multer/dog.multer";
import { authorization } from "../middlewares/auth/key.authorization";
import { Router } from "express";
import GroupController from "../controllers/group.controller";
const router = Router();

function groupRouter(app) {
  app.use("/groups", router);

  router.post("/", GroupController.getKey);
  router.get("/:groupId/members", authorization, GroupController.getMembers);
  router.get("/:groupId/statics", authorization, staticValidation, GroupController.getStatics);
  router.post("/:groupId/album", authorization, dogImageUpload, GroupController.postAlbum);
  router.get("/:groupId/album", authorization, GroupController.getAlbum);
  router.get("/:groupId/timeline", authorization, GroupController.getTimeline);
}

export default groupRouter;
