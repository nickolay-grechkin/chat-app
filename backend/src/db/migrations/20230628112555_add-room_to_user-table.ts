import { Knex } from "knex";
import {Table} from "../../common/enums/enum";

enum ColumnName {
    ID = 'id',
    USER_ID = 'user_id',
    ROOM_ID = 'room_id'
}

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(Table.ROOM_TO_USER, (tableBuilder) => {
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
    });
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists(Table.ROOM_TO_USER);
}

