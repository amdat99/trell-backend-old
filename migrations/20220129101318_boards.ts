import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.debug(true).createTable("board", (table) => {
    table.string("id", 255).primary().notNullable().unique();
    table.string("name", 255).notNullable().unique();
    table.string("org_id", 255).notNullable().references("id").inTable("organisation").index();
    table.string("image", 255);
    table.string("status", 255);
    table.timestamps(true, true);
    table.timestamp("deleted_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("board");
}
