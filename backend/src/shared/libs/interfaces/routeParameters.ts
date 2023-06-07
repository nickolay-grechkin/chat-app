import {Request, Response} from "express";
import { HttpMethod } from "../enums/httpMethod";

interface RouteParameters {
    path: string;
    method: HttpMethod;
    handler: (req: Request, res: Response) => void;
}

export { RouteParameters };
