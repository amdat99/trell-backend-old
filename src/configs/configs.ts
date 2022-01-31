import { Knex, knex } from "knex";
require("dotenv").config();

export const db: Knex = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "trello",
  },
});
