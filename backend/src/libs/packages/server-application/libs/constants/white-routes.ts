import {WhiteRoute} from "../types/type";
import {HttpMethod} from "../../../../../shared/libs/enums/httpMethod";

const whiteRoutes: WhiteRoute[] = [{
    routePath: '/login',
    method: HttpMethod.POST
}];

export { whiteRoutes };
