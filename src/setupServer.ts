import {
  Application,
  json,
  urlencoded,
  Response,
  Request,
  NextFunction,
} from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import cookierSession from "cookie-session";
import HTTP_STATUS from "http-status-codes";
import "express-async-errors";
import compression from "compression";
import cookieSession from "cookie-session";


const SERVER_PORT = 5000;
export class SocialHubServer {
  private app: Application; // instance of an express application -- private

  // constructor
  constructor(app: Application) {
    this.app = app;
  }

  // public methods
  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  // private methods

  // security middlewares
  private securityMiddleware(app: Application): void {

    // cookie session
    app.use(
      cookieSession({
        name: "session",
        keys: ["test1", "test2"],
        maxAge: 24 * 7 * 3600000,
        secure: false,
      })
    );

    app.use(hpp());

    app.use(helmet());

    app.use(
      cors({
        origin: "*",
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      })
    );
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(
      json({
        limit: "50mb",
      })
    );
    app.use(urlencoded({ extended: true, limit: "50mb" }));
  }

  private routesMiddleware(app: Application): void {}

  private globalErrorHandler(app: Application): void {}

  private async startServer(app: Application): Promise<void> {
    try{
        const httpServer: http.Server = new http.Server(app);
        this.startHttpServer(httpServer);
    }catch(error){

    }
  }

  private createSocketIO(httpServer: http.Server): void {}
  
  private startHttpServer(httpServer: http.Server): void {
    httpServer.listen(SERVER_PORT, () => {
        console.log(`Server Running on Port ${SERVER_PORT}`)
    });
  }
}
