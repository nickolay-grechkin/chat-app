import { Model } from "objection";
import Knex from "knex";
import { IDatabase } from "./libs/interfaces/database.interface";

class Database implements IDatabase{
    public connect (): ReturnType<IDatabase['connect']> {
        Model.knex(Knex(this.initialConfig()));
    }

    public initialConfig() {
        return {
            client: 'pg',
            connection: {
                host: 'localhost',
                user: 'postgres',
                password: 'postgres',
                database: 'chatapp',
            },
            migrations: {
                directory: 'src/db/migrations',
                tableName: 'migrations'
            }
        };
    }

}

export { Database };
export { type IDatabase };

