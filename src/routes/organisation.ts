import express from "express";
import { db } from "../configs/configs";
import { organisations, userOrganisations, enterOrganisation, addUserToOrg } from "../controllers/organisation";

export const org = express.Router();

//organisations

org.post("/all", (req, res: any) => {
  return organisations(req, res, db);
});

org.post("/user", (req, res: any) => {
  return userOrganisations(req, res, db);
});

org.post("/enter", (req, res: any) => {
  return enterOrganisation(req, res, db);
});

org.post("/add", (req, res: any) => {
  return addUserToOrg(req, res, db);
});
