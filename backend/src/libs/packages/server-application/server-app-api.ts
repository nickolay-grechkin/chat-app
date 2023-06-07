import {RouteParameters} from "../../../shared/libs/interfaces/routeParameters";

class ServerAppApi {
    public routes: RouteParameters[];

    public constructor(...routes: RouteParameters[]) {
        this.routes = routes;
    }
}

export { ServerAppApi };
