import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.debug(true).createTable("list", (table) => {
    table.string("id", 255).primary().notNullable().unique();
    table.string("name", 255).notNullable();
    table.string("board_id", 255).notNullable().references("id").inTable("board").index().onDelete("CASCADE");
    table.string("image", 255);
    table.string("status", 255);
    table.timestamps(true, true);
    table.timestamp("deleted_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("list");
}
