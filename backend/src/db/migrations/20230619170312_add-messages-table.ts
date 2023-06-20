import { Knex } from "knex";

const TABLE_NAME = 'messages';

const ColumnName = {
    ID: 'id',
    SENDER_ID: 'sender_id',
    RECEIVER_ID: 'receiver_id',
    DIALOG_ID: 'dialog_id',
    CONTENT: 'content',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
}

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table.integer(ColumnName.SENDER_ID).notNullable();
        table.integer(ColumnName.RECEIVER_ID).notNullable();
        table.integer(ColumnName.DIALOG_ID).notNullable();
        table.string(ColumnName.CONTENT).notNullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}


function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };

