import {Request, Response} from "express";
import { HttpMethod } from "../enums/httpMethod";
import {QueryArguments} from "../types/query-arguments";

interface RouteParameters {
    path: string;
    method: HttpMethod;
    handler: (req: Request, res: Response, next: any) => void;
}

export { RouteParameters };
