import { Model } from "objection";
import Knex from "knex";
import { IDatabase } from "./libs/interfaces/database.interface";

class Database implements IDatabase{
    public connect (): ReturnType<IDatabase['connect']> {
        Model.knex(Knex({
            client: 'pg',
            connection: {
                host: 'localhost',
                user: 'postgres',
                password: 'postgres',
                database: 'chatapp',
            },
        }));
    }
}

export { Database };
export { type IDatabase };

