import { Knex } from "knex";
import uuid from "uuid-random";
import argon2 from "argon2";
import { User } from "../types/tableTypes";
import { Error } from "../types/base";
import { error } from "../helpers";
import { ParsedQs } from "qs";
import { Request, Response } from "express-serve-static-core";

export const register = async (
  req: Request,
  res: { status: (arg0: number) => { (): any; new (): any; json: { (arg0: string | Error): unknown; new (): any } } },
  db: Knex
) => {
  const { name, email, password } = req.body as User;

  if (!name || !email || !password) {
    return res.status(400).json(error("incorrect form submission", "register"));
  } else if (password.length < 6) {
    return res.status(400).json(error("password must be at least 6 characters", "register"));
  }

  const hashedPassword = await argon2.hash(password); // hash password
  const date = new Date();
  try {
    await db<User>("user")
      .insert({
        id: uuid(),
        profile_id: uuid(),
        status: "offline",
        created_at: date,
        updated_at: date,
        name: name.toLowerCase(),
        email: email,
        password: hashedPassword,
      })
      .then(() => res.status(200).json("registered successfully"));
  } catch (err) {
    console.log(err),
      err.routine === "_bt_check_unique"
        ? (res.status(400).json(error("user already exists", "register")) as unknown as Error)
        : res.status(500).json(error("error creating user", "register"));
  }
};

export const login = async (
  // @ts-ignore
  req: Request<{}, any, any, ParsedQs, Record<string, any>> & { session: Express.Session },
  res: Response<any, Record<string, any>, number>,
  db: Knex
) => {
  const { email, password } = req.body as User;

  if (!email || !password) {
    return res.status(400).json(error("incorrect form submission", "login"));
  }
  try {
    const user: User[] = await db<User>("user").select("*").where({ email: email });
    if (!user || user.length === 0) return res.status(400).json({ error: "user not found", type: "login" });
    const valid = await argon2.verify(user[0].password!, password); // check if password is valid
    if (!valid) {
      return res.status(400).json({ error: "incorrect password", type: "login" });
    }
    req.session!.userId = user[0].id; // user id stored in session
    if (user[0].admin_id) {
      req.session!.adminId = user[0].admin_id;
      delete user[0].admin_id;
    }
    delete user[0].password;
    delete user[0].id;
    return res.status(200).json(user[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json(error("error logging in", "login"));
  }
};

export const logout = (req: { session: any }, res: Response<any, Record<string, any>, number>) => {
  try {
    req.session!.destroy(() => {
      res.clearCookie("sid");
      res.status(200).json("logged out successfully");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(error("error logging out", "logout"));
  }
};

export const testSessions = (req: { session: any }, res: { json: (arg0: any) => void }) => {
  res.json({ id: req.session.userId });
};
