import {RouteParameters} from "../../../shared/libs/interfaces/routeParameters";

class Controller {
    public routes: RouteParameters[];

    private path: string;

    public constructor(path: string) {
        this.routes = [];
        this.path = path;
    }

    public addRoute(routeOptions: RouteParameters): void {
        const { path: specificPath, method, handler } = routeOptions;

        this.routes.push({ path: this.path + specificPath, method, handler });
    }
}

export { Controller };
