import express, { Express } from "express";
import { IDatabase } from "../database/database";
import {userService} from "../../../packages/users/user";


class ServerApp {
    private app: Express;
    private database: IDatabase;
    public constructor(database: IDatabase) {
        this.app = express();
        this.database = database;
    }

    public async init(): Promise<void> {
        this.database.connect();

        console.log(await userService.findAll());
        this.app.listen(4321,() => {
            console.log("Listening on 4321");
        });
    }
}

export { ServerApp };
