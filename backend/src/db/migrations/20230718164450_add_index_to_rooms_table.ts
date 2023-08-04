import {type Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.table('rooms', tableBuilder => {
		tableBuilder.index('id', 'id_index');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.table('rooms', tableBuilder => {
		tableBuilder.dropIndex('id', 'id_index');
	});
}

