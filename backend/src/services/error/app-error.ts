import {HttpStatus} from "../../common/enums/httpStatus";

class AppError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatus;
    public readonly isOperational: boolean;

    constructor(name: string, httpCode: HttpStatus, description: string, isOperational: boolean) {
        super(description);

        // TODO check what this code is doing
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

export { AppError };
