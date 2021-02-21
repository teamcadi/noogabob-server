import { Router } from "express";
import GroupController from "../controllers/group.controller";
import { dogImageUpload } from "../middlewares/multer/dog.multer";
import validates from "../middlewares/validators/group/group.validation";
import auth from "../middlewares/auth/key.authorization";
const router = Router();

function groupRouter(app) {
  app.use("/groups", router);

  router.post("/", validates.groupValidation, GroupController.createGroup);
  router.get("/:groupId", auth.authorization, GroupController.getGroup);
  router.get("/:groupId/members", auth.authorization, GroupController.getMembers);
  router.get("/:groupId/statics", auth.authorization, validates.staticValidation, GroupController.getStatics);
  router.post("/:groupId/album", auth.authorization, dogImageUpload, GroupController.postAlbum);
  router.get("/:groupId/album", auth.authorization, GroupController.getAlbum);
  router.get("/:groupId/timeline", auth.authorization, GroupController.getTimeline);
}

export default groupRouter;
