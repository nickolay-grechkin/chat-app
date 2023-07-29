import { Model } from "objection";
import Knex from "knex";
import { IDatabase } from "../../services/common/interfaces/database.interface";
import { Client } from "pg";
import * as mysql from "mysql";

class Database implements IDatabase{
    public connect (): ReturnType<IDatabase['connect']> {
        var connection = mysql.createConnection({
            host     : 'chat-app-2.cig7pnqjpyrm.us-east-1.rds.amazonaws.com',
            user     : 'admin',
            password : 'chat-app'
        });

        connection.connect();

        connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
        });
        
        // Model.knex(Knex(this.initialConfig()));
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
                host: 'chat-app.cig7pnqjpyrm.us-east-1.rds.amazonaws.com',
                user: 'postgres',
                password: 'postgres',
                port: '5432',
                database: 'chat-app'
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

