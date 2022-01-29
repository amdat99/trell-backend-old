"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redis_1 = require("redis");
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./routes/auth");
const organisation_1 = require("./routes/organisation");
const app = (0, express_1.default)();
const server = async () => {
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const client = (0, redis_1.createClient)({
        legacyMode: true,
    });
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    await client.set("key", "value");
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: "sid",
        store: new RedisStore({ client: client, disableTouch: true }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        },
        saveUninitialized: false,
        secret: "djnfkfdkjsnkvfkjxhfdjh.dfhbjdfhjfdhfkdhdf",
        resave: false,
    }));
    app.use((0, morgan_1.default)("combined"));
    app.use((0, helmet_1.default)());
    app.use(express_1.default.json());
    app.listen(4000);
    app.use("/auth", auth_1.auth);
    app.use("/org", organisation_1.org);
};
server().catch((err) => console.error(err));
//# sourceMappingURL=server.js.map