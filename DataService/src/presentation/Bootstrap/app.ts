// src/presentation/Bootstrap/app.ts
import express, {Application, Router} from "express";
import {
  corsMiddleware,
  helmetMiddleware,
  compressionMiddleware,
  bodyParserMiddleware,
  urlencodedParserMiddleware,
  limiterMiddleware,
} from "@Presentation/Bootstrap/";
import {AppRoutes} from "@Presentation/Bootstrap/routes";
import { ErrorHandlerMiddleware } from "@Presentation/Bootstrap/middlewares/errorHandler";
import { NotFoundError } from "@Domain/errors/NotFoundError";
import {loggingMiddleware} from "@Presentation/Bootstrap/middlewares";
import {getEnvironment} from "@Utils/environment";
import {createAppLogger} from "@Utils/loggerConfig/loggerConfig";
import {WinstonLoggerService} from "@Infraestructure/services/WinstonLoggerService";
import {ILoggerAdapter} from "@Domain/adapters/types";

export class App {
  public readonly expressApp: Application;
  private logger: ILoggerAdapter;

  /**
   * Constructor de la clase App.
   */
  constructor() {
    this.expressApp = express();
    const env = getEnvironment();
    const baseLogger = createAppLogger(env);
    this.logger = new WinstonLoggerService(baseLogger);
    this.configApp();
  }

  /**
   * Configura todos los aspectos de la aplicación.
   */
  private configApp(): void {
    this.securityMiddlewares();
    this.standartMiddlewares();
    this.setupLogging();
    this.routerApp();
    this.setupErrorHandling();
  }

  /**
   * Configura los middlewares de seguridad.
   */
  private securityMiddlewares(): void {
    this.expressApp.use(corsMiddleware);
    // this.expressApp.use(denyTerminalAgentsMiddleware); // Si lo necesitas, descoméntalo
    this.expressApp.use(limiterMiddleware);
    this.expressApp.use(compressionMiddleware);
    this.expressApp.use(helmetMiddleware);
    this.expressApp.disable("x-powered-by");
    this.expressApp.disable("etag");
  }

  /**
   * Configura los middlewares estándar.
   */
  private standartMiddlewares(): void {
    this.expressApp.use(bodyParserMiddleware);
    this.expressApp.use(urlencodedParserMiddleware);
  }

  /**
   * Configura el sistema de logging.
   */
  private setupLogging(): void {
    this.expressApp.use(loggingMiddleware(this.logger));
  }

  /**
   * Configura las rutas de la aplicación y el manejo de rutas no encontradas.
   */
  private routerApp(): void {
    const router = Router();
    new AppRoutes(router);
    this.expressApp.use("/api", router);
    this.expressApp.use((req, _res, next) => {
      const message = `La ruta ${req.originalUrl} no existe`;
      next(new NotFoundError(message));
    });
  }

  /**
   * Configura el manejo de errores global.
   */
  private setupErrorHandling(): void {
    this.expressApp.use(ErrorHandlerMiddleware.errorHandler(this.logger));
  }
}
