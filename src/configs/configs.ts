import { Knex, knex } from "knex";

export const db: Knex = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "pass",
    database: "trello",
  },
});
