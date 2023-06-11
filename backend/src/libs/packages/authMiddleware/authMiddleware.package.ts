import { Request, Response } from "express";
import {ErrorMessage, HttpStatus} from "../../../shared/libs/enums/enum";
import { whiteRoutes } from "../server-application/libs/constants/white-routes";
import { token as tokenPackage } from '../token/token';

// TODO Refactor
const authMiddleware = (req: Request, res: Response, next: any) => {
    const authHeader = req.headers.authorization;
    const isWhiteRoute = whiteRoutes.some((whiteRoute) => {
        const isWhiteRoute = whiteRoute.routePath === req.path;
        const isAvailableMethod = whiteRoute.method === req.method.toLowerCase();

        return isWhiteRoute && isAvailableMethod;
    })

    if (isWhiteRoute) {
        next();
        return;
    }

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        const decodedTokenPayload = tokenPackage.decode(token);
        if (decodedTokenPayload?.err) {
            res.status(HttpStatus.FORBIDDEN).send(ErrorMessage.FORBIDDEN);
        }
        (req as any).user = decodedTokenPayload?.payload;
        next();
    } else {
        res.status(HttpStatus.UNAUTHORIZED).send(ErrorMessage.UNAUTHORIZED)
    }
}

export { authMiddleware };
