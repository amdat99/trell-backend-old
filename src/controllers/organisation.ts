import { Knex } from "knex";
import { OrgUser, Organisation, User } from "../types/tableTypes";
import { Error } from "../types/base";
import { error } from "../helpers";

// select all orgs a user belongs to
export const userOrganisations = async (
  req: { session: any },
  res: {
    status: (arg0: number) => { (): any; new (): any; json: { (arg0: OrgUser[] | Error): void; new (): any } };
  },
  db: Knex
) => {
  try {
    if (!req.session!.userId) return res.status(404).json(error("unauthorised access", "unauthenticated"));
    const organisations = await db<OrgUser>("org_user")
      .select("name", "role", "image", "created_at", "updated_at", "deleted_at")
      .where({ user_id: req.session!.userId });
    if (!organisations || !organisations.length) {
      return res.status(400).json(error("no user organisations found", "userOrganisation"));
    }
    res.status(200).json(organisations);
  } catch (error) {
    console.log(error);
    res.status(500).json(error("error getting user organisations", "userOrganisation"));
  }
};

// authenticate a user when a user enters organisation
export const enterOrganisation = async (
  req: { body: OrgUser; session: any },
  res: {
    status: (arg0: number) => { (): any; new (): any; json: { (arg0: OrgUser[] | Error): void; new (): any } };
  },
  db: Knex
) => {
  if (!req.session!.userId) return res.status(404).json(error("unauthorised access", "unauthenticated"));
  const { name } = req.body as OrgUser;
  if (!name) return res.status(400).json(error("no name provided", "userOrganisation"));
  try {
    const org_user = await db<OrgUser>("org_user").select("*").where({ user_id: req.session!.userId, name: name });
    if (!org_user || !org_user.length) {
      return res.status(400).json(error("no organisation found", "userOrganisation"));
    }
    req.session!.organisationId = org_user[0].org_id;
    delete org_user[0].user_id;
    delete org_user[0].org_id;
    res.status(200).json(org_user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error("error entering organisation", "userOrganisation"));
  }
};

//select all organisations
export const organisations = async (
  req: { session: any },
  res: {
    status: (arg0: number) => { (): any; new (): any; json: { (arg0: Organisation[] | Error): void; new (): any } };
  },
  db: Knex
) => {
  if (!req.session!.userId) return res.status(404).json(error("unauthorised access", "unauthenticated"));
  try {
    const organisations = await db<Organisation>("organisation").select(
      "public_id",
      "name",
      "image",
      "description",
      "website",
      "email",
      "phone",
      "address",
      "postcode",
      "city",
      "country",
      "latitude",
      "longitude",
      "created_at",
      "updated_at",
      "deleted_at"
    );
    res.status(200).json(organisations);
  } catch (error) {
    console.log(error);
    res.status(500).json(error("error getting organisations", "organisations"));
  }
};

// add a user to an org when within a org and admin user
export const addUserToOrg = async (
  req: { session: any; body: { profile_id: any; name: any } },
  res: { status: (arg0: number) => { (): any; new (): any; json: { (arg0: string | Error): void; new (): any } } },
  db: Knex
) => {
  if (!req.session!.userId) return res.status(404).json(error("unauthorised access", "unauthenticated"));
  if (!req.session!.adminId) return res.status(404).json(error("unauthorised access", "unauthenticated"));

  const { profile_id, name } = req.body;

  const user = await db<User>("user").select("id").where({ profile_id: profile_id });
  if (!user || !user.length) {
    return res.status(400).json(error("no user found", "addUserToOrg"));
  }

  try {
    const organisation = (await db<OrgUser>("org_user").select("*").where({ user_id: user[0].id, name: name })) as any;
    if (organisation || organisation.length) {
      return res.status(400).json(error("user already in organisation", "addUserToOrg"));
    }
    await db<OrgUser>("org_user")
      .insert({
        user_id: user[0].id,
        org_id: req.session!.organisationId,
        role: "member",
        name: name,
      })
      .then(() => res.status(200).json("user added successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(error("error getting organisations", "addUserToOrg"));
  }
};
