import { Router } from "express";
import dogRouter from "./dog.router";
import groupRouter from "./group.router";
import userRouter from "./user.router";
const rootRouter = Router();

function routes() {
  userRouter(rootRouter);
  groupRouter(rootRouter);
  dogRouter(rootRouter);

  return rootRouter;
}

export default routes;
