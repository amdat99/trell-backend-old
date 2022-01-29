import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.debug(true).createTable("organisation", (table) => {
    table.string("id", 255).primary().notNullable().unique();
    table.string("public_id", 255).notNullable().unique();
    table.string("name", 255).notNullable().unique();
    table.string("image", 255);
    table.string("status", 255);
    table.string("description", 2000);
    table.string("website", 255);
    table.string("email", 255);
    table.string("phone", 255);
    table.string("address", 2000);
    table.string("postcode", 255);
    table.string("city", 255);
    table.string("country", 255);
    table.float("latitude", 255);
    table.float("longitude", 255);
    table.timestamps(true, true);
    table.timestamp("deleted_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("organisation");
}
