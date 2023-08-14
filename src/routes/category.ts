import { Response, Router } from "express";
import { AbstractRoutes, Routes } from "@interfaces/routes.interface";

export class CategoryRouter {
  public router: Router;
  public path: string;

  public constructor() {
    // super();

    this.router = Router();
    this.path = "/category";

    // this.setupName();
  }

  public initRoutes = () => {
    this.router.get("/", function (_, res: Response) {
      res.json({ message: true });
    });
  };
}
