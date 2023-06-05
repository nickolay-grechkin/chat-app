import {RouteParameters} from "../../../common/interfaces/routeParameters";

class ServerAppApi {
    public routes: RouteParameters[];

    public constructor(...routes: RouteParameters[]) {
        this.routes = routes;
    }
}

export { ServerAppApi };
