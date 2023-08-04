import {type RouteParameters} from '../../../../common/interfaces/routeParameters';

class Controller {
	public routes: RouteParameters[];

	public constructor() {
		this.routes = [];
	}

	public addRoute(routeOptions: RouteParameters): void {
		const {path, method, handler} = routeOptions;

		this.routes.push({path, method, handler});
	}
}

export {Controller};
