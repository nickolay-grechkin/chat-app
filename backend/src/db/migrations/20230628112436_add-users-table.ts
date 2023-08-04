import {type Knex} from 'knex';
import {Table} from '../../common/enums/enum';

enum ColumnName {
	ID = 'id',
	EMAIL = 'email',
	PASSWORD = 'password',
	PICTURE = 'picture',
	CREATED_AT = 'created_at',
	UPDATED_AT = 'updated_at',
}

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(Table.USERS, tableBuilder => {
		tableBuilder.increments(ColumnName.ID).primary();
		tableBuilder.string(ColumnName.EMAIL).notNullable().unique();
		tableBuilder.string(ColumnName.PASSWORD).notNullable();
		tableBuilder.string(ColumnName.PICTURE);
		tableBuilder.dateTime(ColumnName.CREATED_AT).notNullable().defaultTo(knex.fn.now());
		tableBuilder.dateTime(ColumnName.UPDATED_AT).notNullable().defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(Table.USERS);
}

