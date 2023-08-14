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
    this.router.get("/", function (_, res: Response) {
      res.json({ message: true });
    });
    this.router.post("/", this.controller.CREATE_USER);
  };
}
