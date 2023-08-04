import {type Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.table('messages', tableBuilder => {
		tableBuilder.index('room_id', 'room_id_index');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.table('messages', tableBuilder => {
		tableBuilder.dropIndex('room_id', 'room_id_index');
	});
}

