import ansiColors from "ansi-colors";
import {Router} from "express";
import { EthAgenticRoutes } from "../EthAgentic/routes/EthAgenticRoutes";

interface RouteClass {
  routes: Router;
  name: string;
}

export class AppRoutes {
  constructor(router: Router) {
    const v1Routes: RouteClass[] = [
      new EthAgenticRoutes()
    ];
    const v2Routes: RouteClass[] = [];

    this.initializeVersionedRoutes(router, v1Routes, "v1");
    this.initializeVersionedRoutes(router, v2Routes, "v2");
  }

  private initializeVersionedRoutes(router: Router, routeClasses: RouteClass[], version: string) {
    const versionRouter = Router();
    this.initializeRoutes(versionRouter, routeClasses, version);
    router.use(`/${version}`, versionRouter);
  }

  private initializeRoutes(router: Router, routeClasses: RouteClass[], version: string) {
    routeClasses.forEach((RouteClass) => {
      const routeInstance = RouteClass.routes;
      router.use(routeInstance);
      console.log(
        ansiColors.yellow(
          `📒 Router: ${RouteClass.name} - ${routeInstance ? "Connected" : "Failed"} - /api/${version}`,
        ),
      );
    });
  }
}
