import { Knex } from "knex";
import {Table} from "../../common/enums/enum";

const COLUMN_NAME = 'isIndividualRoom';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(Table.ROOMS, tableBuilder => {
       tableBuilder
           .boolean(COLUMN_NAME)
           .notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(Table.ROOMS, tableBuilder => {
        tableBuilder.dropColumn(COLUMN_NAME);
    });
}

