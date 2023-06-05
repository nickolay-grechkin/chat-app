import {ServerApp} from "./server-app";
import {database} from "../database/database";
import {ServerAppApi} from "./server-app-api";
import {userController} from "../../../packages/users/user";

const serverApp = new ServerApp(database, [...userController.routes]);

export { serverApp };
