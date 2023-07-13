import express, {Response, Request, Express, NextFunction} from "express";
import { IDatabase } from "../../configs/database/database";
import { RouteParameters } from "../../common/interfaces/routeParameters";
import { HttpMethod } from "../../common/enums/httpMethod";
import { authMiddleware } from "../../middlewares/authMiddleware/authMiddleware";
import * as dotenv from 'dotenv';
import * as http from 'http';
import { Socket } from "../socket/socket.service";
import cors from 'cors';
import {errorHandlerMiddleware} from "../../middlewares/authMiddleware/error-handler.middleware";

const router = express.Router();

class ServerService {
    private readonly app: Express;

    private database: IDatabase;

    private api: RouteParameters[];

    private readonly server: http.Server;

    public constructor(database: IDatabase, api: RouteParameters[]) {
        this.app = express();
        this.database = database;
        this.api = api;
        this.server = http.createServer(this.app);
    }

    private addRoute = (parameters: { path: string, method: HttpMethod, handler: (req: Request, res: Response, next: any) => void }) => {
        const { path, method, handler } = parameters;

        router[method](path, handler);
    }

    private initRoutes(): void {
        this.api.map(it => {
            this.addRoute(it)
        });
        this.app.use(router);
    }

    private initMiddlewares(): void {
        this.app.use(cors());
        this.app.use(authMiddleware);
        this.app.use(express.json());
    }

    private initSocket(): void {
        Socket.init(this.server);
    }

    public async init(): Promise<void> {
        dotenv.config();
        this.database.connect();
        this.initMiddlewares();
        this.initRoutes();
        this.app.use(errorHandlerMiddleware);
        this.initSocket();

        this.server.listen(process.env.APP_PORT,() => {
            console.log("Listening on " + process.env.APP_PORT);
        });
    }
}

export { ServerService };
