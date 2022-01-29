import express from "express";
import connectRedis from "connect-redis";
import { createClient } from "redis";
import session from "express-session";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { auth } from "./routes/auth";
import { org } from "./routes/organisation";

const app = express();

const server = async () => {
  const RedisStore = connectRedis(session);
  const client = createClient({
    legacyMode: true,
  });
  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();
  await client.set("key", "value");

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: "sid",
      store: new RedisStore({ client: client, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", //only use https in production
        sameSite: "lax",
      },
      saveUninitialized: false,
      secret: "djnfkfdkjsnkvfkjxhfdjh.dfhbjdfhjfdhfkdhdf",
      resave: false,
    })
  );

  app.use(morgan("combined"));
  app.use(helmet());
  app.use(express.json()); // for json
  // app.use(express.urlencoded({ extended: true })); // for form data
  app.listen(4000);

  app.use("/auth", auth);
  app.use("/org", org);
};

server().catch((err) => console.error(err));
