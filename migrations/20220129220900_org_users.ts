import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("org_user", (table) => {
    table.string("org_id", 255).notNullable().references("id").inTable("organisation").onDelete("CASCADE");
    table.string("user_id", 255).notNullable().references("id").inTable("user").onDelete("CASCADE");
    table.string("role", 255);
    table.string("image", 255);
    table.timestamps(true, true);
    table.timestamp("deleted_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("org_user");
}
