import {type Knex} from 'knex';
import {Table} from '../../common/enums/enum';

enum ColumnName {
	ID = 'id',
	NAME = 'name',
	PICTURE = 'picture',
	LAST_MESSAGE = 'last_message',
	CREATED_AT = 'created_at',
	UPDATED_AT = 'updated_at',

}

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(Table.ROOMS, tableBuilder => {
		tableBuilder.increments(ColumnName.ID).primary();
		tableBuilder.string(ColumnName.NAME);
		tableBuilder.string(ColumnName.PICTURE);
		tableBuilder.string(ColumnName.LAST_MESSAGE);
		tableBuilder.dateTime(ColumnName.CREATED_AT).notNullable().defaultTo(knex.fn.now());
		tableBuilder.dateTime(ColumnName.UPDATED_AT).notNullable().defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(Table.ROOMS);
}

