import {ServerApp} from "./server-app";
import {database} from "../database/database";

const serverApp = new ServerApp(database);

export { serverApp };
