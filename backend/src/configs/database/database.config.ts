import {Model} from 'objection';
import Knex from 'knex';
import {type IDatabase} from '../../services/common/interfaces/database.interface';

class Database implements IDatabase {
	public async connect(): Promise<ReturnType<IDatabase['connect']>> {
		Model.knex(Knex(this.initialConfig()));
	}

	public initialConfig() {
		const {
			CLIENT,
			MIGRATIONS_TABLE_NAME,
			HOST,
			USER,
			PASSWORD,
			MIGRATIONS_DIRECTORY,
			DB_PORT,
		} = process.env;

		return {
			client: CLIENT,
			connection: {
				host: HOST,
				user: USER,
				password: PASSWORD,
				port: Number(DB_PORT),
				ssl: {
					rejectUnauthorized: false,
				},
			},
			migrations: {
				directory: MIGRATIONS_DIRECTORY,
				tableName: MIGRATIONS_TABLE_NAME,
			},
		};
	}
}

export {Database};
export {type IDatabase};

