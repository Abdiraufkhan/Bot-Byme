import { Router } from "express";
import UserController from "./user.controller";
import { checkAdminMiddleware } from "middlewares/checkAdmin.middleware";

class UserRoute {
    public path = "/admin";
    public router = Router();
    public controller = new UserController();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get("/list", checkAdminMiddleware, this.controller.getAll);
        this.router.post("/create", this.controller.register);
        this.router.post("/login", this.controller.login)
    }
}

export default UserRoute;
