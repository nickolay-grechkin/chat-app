import {ServerApp} from "./server-app";
import {database} from "../database/database";
import {userController} from "../../../packages/users/user";
import {authController} from "../../../packages/auth/auth";

const serverApp = new ServerApp(database, [...userController.routes, ...authController.routes]);

export { serverApp };
