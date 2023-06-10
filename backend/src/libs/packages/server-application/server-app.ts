import express, { Response, Request, Express } from "express";
import { IDatabase } from "../database/database";
import { RouteParameters } from "../../../shared/libs/interfaces/routeParameters";
import { HttpMethod } from "../../../shared/libs/enums/httpMethod";
import { authMiddleware } from "../authMiddleware/authMiddleware";
import * as dotenv from 'dotenv';

const router = express.Router();

class ServerApp {
    private app: Express;

    private database: IDatabase;

    private api: RouteParameters[];

    public constructor(database: IDatabase, api: RouteParameters[]) {
        this.app = express();
        this.database = database;
        this.api = api;
    }

    private addRoute = (parameters: { path: string, method: HttpMethod, handler: (req: Request, res: Response) => void }) => {
        const { path, method, handler } = parameters;

        router[method](path, handler);
    }

    public initRoutes(): void {
        this.api.map(it => this.addRoute(it));
        this.app.use(router);
    }

    public initMiddlewares(): void {
        this.app.use(authMiddleware);
        this.app.use(express.json());
    }

    public async init(): Promise<void> {
        dotenv.config();
        this.database.connect();

        this.initMiddlewares();
        this.initRoutes();

        this.app.listen(process.env.APP_PORT,() => {
            console.log("Listening on " + process.env.APP_PORT);
        });
    }
}

export { ServerApp };
