import {type Knex} from 'knex';
import {Table} from '../../common/enums/enum';

enum ColumnName {
	ID = 'id',
	USER_ID = 'user_id',
	ROOM_ID = 'room_id',
	CONTENT = 'content',
	CREATED_AT = 'created_at',
	UPDATED_AT = 'updated_at',
}

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(Table.MESSAGES, tableBuilder => {
		tableBuilder.increments(ColumnName.ID).primary();
		tableBuilder
			.integer(ColumnName.USER_ID)
			.notNullable()
			.unsigned()
			.references('id')
			.inTable('users');
		tableBuilder
			.integer(ColumnName.ROOM_ID)
			.notNullable()
			.unsigned()
			.references('id')
			.inTable('rooms');
		tableBuilder.string(ColumnName.CONTENT).notNullable();
		tableBuilder.dateTime(ColumnName.CREATED_AT).notNullable().defaultTo(knex.fn.now());
		tableBuilder.dateTime(ColumnName.UPDATED_AT).notNullable().defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(Table.MESSAGES);
}

