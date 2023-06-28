import { Database } from "./database.config";

const database = new Database();

export { database };
export { type IDatabase } from "../../services/common/interfaces/database.interface";
