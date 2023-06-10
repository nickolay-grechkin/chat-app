import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import {HttpStatus} from "../../../shared/libs/enums/enum";
import { whiteRoutes } from "../server-application/libs/constants/white-routes";

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
        const secret = process.env.SECRET_KEY ?? '';

        jwt.verify(token, secret, (err, user) => {
           if (err) {
               res.status(HttpStatus.FORBIDDEN).send("Access to this route is forbidden");
           }
           (req as any).user = user;
           next();
        });
    } else {
        res.status(HttpStatus.UNAUTHORIZED).send('You need to provide an authorization token to access this endpoint.')
    }
}

export { authMiddleware };
