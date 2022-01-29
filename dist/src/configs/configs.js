"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const knex_1 = require("knex");
exports.db = (0, knex_1.knex)({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "postgres",
        password: "pass",
        database: "trello",
    },
});
//# sourceMappingURL=configs.js.map