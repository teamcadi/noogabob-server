import { Router } from "express";
import userRouter from "./users";
const rootRouter = Router();

function routes() {
  userRouter(rootRouter);

  return rootRouter;
}

export default routes;
