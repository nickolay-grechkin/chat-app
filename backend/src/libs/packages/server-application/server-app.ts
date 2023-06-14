import express, { Response, Request, Express } from "express";
import { IDatabase } from "../database/database";
import { RouteParameters } from "../../../shared/libs/interfaces/routeParameters";
import { HttpMethod } from "../../../shared/libs/enums/httpMethod";
import { authMiddleware } from "../authMiddleware/authMiddleware";
import * as dotenv from 'dotenv';
import * as WebSocket from 'ws';
import * as http from 'http';

const router = express.Router();

class ServerApp {
    private app: Express;

    private database: IDatabase;

    private api: RouteParameters[];

    private webSocketServer;

    private server;

    private clients: WebSocket[];

    public constructor(database: IDatabase, api: RouteParameters[]) {
        this.app = express();
        this.database = database;
        this.api = api;
        this.server = http.createServer(this.app);
        this.webSocketServer = new WebSocket.Server({ server: this.server });
        this.clients = [];
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

        this.webSocketServer.on('connection', (ws: WebSocket) => {
            let id = Math.random();
            this.clients[id] = ws;

            const connectedClients = this.clients;

            ws.on('message', function(message) {
                console.log('получено сообщение ' + message);

                console.log(connectedClients);

                for (let key in connectedClients) {
                    connectedClients[key].send(message);
                }
            });

            ws.on('close', function() {
                console.log('соединение закрыто ' + id);
                delete connectedClients[id];
            });
        });

        this.server.listen(process.env.APP_PORT,() => {
            console.log("Listening on " + process.env.APP_PORT);
        });
    }
}

export { ServerApp };
