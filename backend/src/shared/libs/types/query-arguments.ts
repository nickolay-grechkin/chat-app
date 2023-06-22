import { Response, Request } from 'express';

type QueryArguments = {
    req: Request;
    res: Response;
}

export { QueryArguments };
