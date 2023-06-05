import {HttpMethod} from "../enums/httpMethod";

interface ControllerRouteParameters {
    path: string;
    method: HttpMethod;
    handler: (options: {}) => void;
}
