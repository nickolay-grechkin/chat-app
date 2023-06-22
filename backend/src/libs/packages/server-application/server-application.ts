import {ServerApp} from "./server-app";
import {database} from "../database/database";
import {userController} from "../../../packages/users/user";
import {authController} from "../../../packages/auth/auth";
import {messagesController} from "../../../packages/messages/messages";

const serverApp = new ServerApp(
    database,
    [
        ...userController.routes,
        ...authController.routes,
        ...messagesController.routes
    ]);

export { serverApp };
