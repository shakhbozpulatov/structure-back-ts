import { Response, Router } from "express";
import { AbstractRoutes, Routes } from "@interfaces/routes.interface";
import { UsersController } from "@/controllers/user";

export class UsersRouter {
  public router: Router;
  public path: string;

  private controller: UsersController;

  public constructor() {
    this.router = Router();
    this.path = "/users";
    this.controller = new UsersController();

    this.initRoutes();
  }

  public initRoutes = () => {
    this.router.post("/register", this.controller.REGISTER);
    // this.router.post("/login", this.controller.LOGIN);
    // this.router.post("/confirm", this.controller.CONFIRM);
  };
}
