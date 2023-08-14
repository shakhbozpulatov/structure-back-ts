import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { Routes } from "@interfaces/routes.interface";
import {
  CDN_URL,
  CREDENTIALS,
  LOG_FORMAT,
  NODE_ENV,
  ORIGIN,
  PORT,
} from "@config";
import { logger } from "@utils/logger";
import path from "node:path";
import { errorMiddleware } from "@middlewares/error.middleware";

export default class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(...routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.initMiddlewares();
    this.initRoutes(routes);
    this.initUtils();
    this.initErrorMiddleware();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  private corsMiddleware(origin: any, callback: any): void {
    if (!origin || ORIGIN === "*" || ORIGIN.split(" ").includes(origin))
      callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  }

  private initMiddlewares() {
    this.app.use(
      cors({ origin: this.corsMiddleware, credentials: CREDENTIALS })
    );
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initUtils() {
    this.app.use(
      express.static(path.join(__dirname, "..", "public"), {
        setHeaders: (res) => {
          res.set("Access-Control-Allow-Origin", "*");
          res.set("Access-Control-Allow-Credentials", "true");
          res.set("Cross-Origin-Resource-Policy", "cross-origin");
        },
        dotfiles: "ignore",
        cacheControl: true,
      })
    );
  }

  private initRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }

  private initErrorMiddleware() {
    this.app.use(errorMiddleware);
  }
}
