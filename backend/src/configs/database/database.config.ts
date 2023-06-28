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
            client: CLIENT,
            connection: {
                host: HOST,
                user: USER,
                password: PASSWORD,
                database: DATABASE,
            },
            migrations: {
                directory: MIGRATIONS_DIRECTORY,
                tableName:MIGRATIONS_TABLE_NAME
            }
        };
    }

}

export { Database };
export { type IDatabase };

