import { Router } from "express";
const router = Router();

function groupRouter(app) {
  app.use("/groups", router);

  router.post("/", (req, res) => {});
  router.get("/:groupId/members", (req, res) => {});
  router.get("/:groupId/ranking", (req, res) => {});
  router.post("/:groupId/album", (req, res) => {});
  router.get("/:groupId/timeline", (req, res) => {});
}

export default groupRouter;
