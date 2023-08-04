import {Request, type RequestHandler, Response} from 'express';
import {type HttpMethod} from '../enums/httpMethod';
import {QueryArguments} from '../types/query-arguments';

type RouteParameters = {
	path: string;
	method: HttpMethod;
	middleware?: RequestHandler;
	handler: RequestHandler;
};

export type {RouteParameters};
