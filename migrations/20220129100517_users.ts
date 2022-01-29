import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user", (table) => {
    table.string("id", 255).primary().notNullable().unique();
    table.string("profile_id", 255).notNullable().unique();
    table.string("admin_id", 255).unique();
    table.string("status", 255);
    table.string("name", 255).notNullable().unique();
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).notNullable();
    table.string("image", 255);
    table.timestamps(true, true);
    table.timestamp("deleted_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user");
}
