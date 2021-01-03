import { Router } from "express";
import userRouter from "./user.router";
const rootRouter = Router();

function routes() {
  userRouter(rootRouter);

  rootRouter.post("/books", (req, res) => {
    console.log(req.body);
    res.status(201).send([{ id: 1, title: req.body }]);
  });
  return rootRouter;
}

export default routes;
