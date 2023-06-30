import {WhiteRoute} from "../types/types";
import {HttpMethod} from "../../../../common/enums/httpMethod";
import {AppEndpoint} from "../../../../common/enums/enum";

const whiteRoutes: WhiteRoute[] = [{
    routePath: AppEndpoint.LOGIN,
    method: HttpMethod.POST
}, {
    routePath: AppEndpoint.ROOMS,
    method: HttpMethod.GET
}];

export { whiteRoutes };
