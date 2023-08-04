import {type Response, type Request} from 'express';

type QueryArguments = {
	req: Request;
	res: Response;
};

export type {QueryArguments};
