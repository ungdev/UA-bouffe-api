import { Models } from "../types";
import { Router } from "express";
import auth from "./auth";
import order from "./order";

const routes = (models: Models) => {

  const router = Router();

  router.use(auth());
  router.use(order(models));

  return router;
}

export default routes;