import { HttpStatus } from '../../common/enums/httpStatus';

class AppError extends Error {
	public readonly message: string;
	public readonly httpCode: HttpStatus;
	public readonly isOperational: boolean;

	constructor(message: string, httpCode: HttpStatus, isOperational: boolean) {
		super(message);

		// TODO check what this code is doing
		Object.setPrototypeOf(this, new.target.prototype);

		this.message = message;
		this.httpCode = httpCode;
		this.isOperational = isOperational;

		Error.captureStackTrace(this);
	}
}

export { AppError };
