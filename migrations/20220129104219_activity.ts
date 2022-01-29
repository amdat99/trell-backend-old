import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("activity", (table) => {
    table.string("id", 255).primary().notNullable().unique();
    table.string("task_id", 255).notNullable().references("id").inTable("task").index().onDelete("CASCADE");
    table.string("action", 255);
    table.string("assigner", 255).notNullable();
    table.string("assignee", 255);
    table.string("file_name", 255);
    table.string("file_id", 255);
    table.string("status", 255);
    table.string("image", 255);
    table.timestamps(true, true);
    table.timestamp("deleted_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("activity");
}
