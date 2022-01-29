import express from "express";
import { db } from "../configs/configs";
import { register, login, logout, testSessions } from "../controllers/auth";

export const auth = express.Router();

//auth

auth.post("/register", (req, res: any) => {
  return register(req, res, db);
});

auth.post("/login", (req, res: any) => {
  return login(req, res, db);
});

auth.post("/logout", (req, res: any) => {
  return logout(req, res);
});

auth.post("/test", (req, res: any) => {
  return testSessions(req, res);
});
