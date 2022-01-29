import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("comment", (table) => {
    table.string("id", 255).primary().notNullable().unique();
    table.string("task_id", 255).notNullable().references("id").inTable("task").index().onDelete("CASCADE");
    table.string("message", 5000);
    table.string("reply_message", 1000);
    table.string("reply_name", 255);
    table.integer("likes").defaultTo(0);
    table.integer("files_num").defaultTo(0);
    table.string("status", 255);
    table.string("name", 255).notNullable();
    table.string("image", 255);
    table.timestamps(true, true);
    table.timestamp("deleted_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("comment");
}
