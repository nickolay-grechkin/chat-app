import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../common/enums/httpStatus';
import { AppError } from '../../services/error/app-error';

export const errorHandlerMiddleware = (
	error: AppError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	res.status(error.httpCode).send(error.message);
	next();
};
