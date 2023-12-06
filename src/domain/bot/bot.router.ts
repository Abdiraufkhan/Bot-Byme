import { Router } from "express";
import BotController from "./bot.controller";
import { checkAdminMiddleware } from "middlewares/checkAdmin.middleware";


class BotRoute {
  public path = "/";
  public router = Router();
  public controller = new BotController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", this.controller.get);
    this.router.get("/list", checkAdminMiddleware, this.controller.getAll);
    this.router.post("/", this.controller.post);
  }
}

export default BotRoute;
