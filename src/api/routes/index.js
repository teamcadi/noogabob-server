import { Router } from "express";
import dogsRouter from "./dogs.router";
import groupRouter from "./group.router";
import userRouter from "./user.router";
const rootRouter = Router();

function routes() {
  userRouter(rootRouter);
  groupRouter(rootRouter);
  dogsRouter(rootRouter);

  return rootRouter;
}

export default routes;
