import { type Router } from "express";

export interface Routes {
  path: string;
  router: Router;
}

export abstract class AbstractRoutes {
  abstract path: string;
  abstract router: Router;

  abstract initRoutes: () => void;

  public setupName = () => {
    console.log("ok");
  };
}
