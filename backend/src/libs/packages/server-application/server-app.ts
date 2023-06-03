import express, {Express, Request, Response} from "express";

class ServerApp {
    private app: Express;

    public constructor() {
        this.app = express();
    }

    public async init(): Promise<void> {
        this.app.get('/', (req: Request, res: Response) => {
            res.send("Hello from class component");
        });

        this.app.listen(4321,() => {
            console.log("Listening on 4321");
        });
    }
}

export { ServerApp };
