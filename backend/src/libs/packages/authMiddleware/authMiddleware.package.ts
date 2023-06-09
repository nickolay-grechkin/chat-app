import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";


const authMiddleware = (req: Request, res: Response, next: any) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, '123456', (err, decoded) => {
           if (err) {
               // TODO Add status codes enum
               res.status(401).send("Access to this route is forbidden");
           }
           console.log("Decode: ", decoded);
           next();
        });
    } else {
        res.status(401).send('You need to provide an authorization token to access this endpoint.')
    }
}

export { authMiddleware };
