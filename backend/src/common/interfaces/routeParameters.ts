import {Request, RequestHandler, Response} from "express";
import { HttpMethod } from "../enums/httpMethod";
import {QueryArguments} from "../types/query-arguments";

interface RouteParameters {
    path: string;
    method: HttpMethod;
    middleware?: RequestHandler;
    handler: RequestHandler;
}

export { RouteParameters };
