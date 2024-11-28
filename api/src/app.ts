import express from "express";
import cors from "cors";
import helmet from "helmet";
import errorMiddleware from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import logger from "./config/logger";
import dbConnect from "./config/dbconnect";
import type Controller from "./utils/interfaces/controller.interface";

class App {
  express;
  port;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initializeDatabase();
  }

  initializeDatabase = async () => {
    dbConnect();
  };

  initializeMiddleware = () => {
    this.express.use(
      cors({
        origin: "*",
      }),
    );
    this.express.use(helmet());
    this.express.use(express.json({ limit: "50mb" }));
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cookieParser());
  };

  private readonly initializeControllers = (
    controllers: Controller[],
  ): void => {
    controllers.forEach((controller) => {
      this.express.use("/", controller.router);
    });
  };

  private readonly initializeErrorHandling = (): void => {
    this.express.use(errorMiddleware);
  };

  public listen = (): void => {
    this.express.listen(this.port, () => {
      logger.info(`Server listening on PORT ${this.port}`);
    });
  };
}

export default App;
