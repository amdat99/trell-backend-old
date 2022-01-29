import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.debug(true).createTable("task", (table) => {
    table.string("id", 255).primary().notNullable().unique();
    table.string("name", 255).notNullable();
    table.string("description", 10000);
    table.json("labels");
    table.string("list_id", 255).notNullable().references("id").inTable("list").index().onDelete("CASCADE");
    table.string("created_by", 255).notNullable();
    table.string("image", 255);
    table.string("status", 255);
    table.timestamps(true, true);
    table.timestamp("deleted_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("task");
}
