import {type Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.table('users', tableBuilder => {
		tableBuilder.index('id', 'id_new_index');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.table('users', tableBuilder => {
		tableBuilder.index('id', 'id_new_index');
	});
}

