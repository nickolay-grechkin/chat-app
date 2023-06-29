import { Model } from "objection";
import Knex from "knex";
import { IDatabase } from "../../services/common/interfaces/database.interface";

class Database implements IDatabase{
    public connect (): ReturnType<IDatabase['connect']> {
        Model.knex(Knex(this.initialConfig()));
    }

    public initialConfig() {
        const {
            CLIENT,
            DATABASE,
            MIGRATIONS_TABLE_NAME,
            HOST,
            USER,
            PASSWORD,
            MIGRATIONS_DIRECTORY
        } = process.env;

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

