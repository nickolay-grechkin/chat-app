import {WhiteRoute} from "../types/types";
import {HttpMethod} from "../../../../common/enums/httpMethod";

const whiteRoutes: WhiteRoute[] = [{
    routePath: '/login',
    method: HttpMethod.POST
}];

export { whiteRoutes };
