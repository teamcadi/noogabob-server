import { staticValidation } from "../middlewares/validators/group/group.validation";
import { dogImageUpload } from "../middlewares/multer/dog.multer";
import { Router } from "express";
import GroupController from "../controllers/group.controller";
const router = Router();

function groupRouter(app) {
  app.use("/groups", router);

  router.post("/", GroupController.getKey);
  router.get("/:groupId/members", GroupController.getMembers);
  router.get("/:groupId/statics", staticValidation, GroupController.getStatics);
  router.post("/:groupId/album", dogImageUpload, GroupController.postAlbum);
  router.get("/:groupId/album", GroupController.getAlbum);
  router.get("/:groupId/timeline", (req, res) => {});
}

export default groupRouter;
