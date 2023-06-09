import express, {Response, Request, Express, IRouterMatcher} from "express";
import { IDatabase } from "../database/database";
import { RouteParameters } from "../../../shared/libs/interfaces/routeParameters";
import { HttpMethod } from "../../../shared/libs/enums/httpMethod";
import { authMiddleware } from "../authMiddleware/authMiddleware";

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

        // TODO do not import authMiddleware path as constructor args
        router[method](path, authMiddleware, handler);
    }

    public initRoutes(): void {
        this.api.map(it => this.addRoute(it));
        this.app.use(router);
    }


    public async init(): Promise<void> {
        this.database.connect();

        this.app.use(express.json());

        this.initRoutes();

        this.app.listen(4321,() => {
            console.log("Listening on 4321");
        });
    }
}

export { ServerApp };
