"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserToOrg = exports.organisations = exports.enterOrganisation = exports.userOrganisations = void 0;
const helpers_1 = require("../helpers");
const userOrganisations = async (req, res, db) => {
    try {
        if (!req.session.userId)
            return res.status(404).json((0, helpers_1.error)("unauthorised access", "unauthenticated"));
        const organisations = await db("org_user")
            .select("name", "role", "image", "created_at", "updated_at", "deleted_at")
            .where({ user_id: req.session.userId });
        if (!organisations || !organisations.length) {
            return res.status(400).json((0, helpers_1.error)("no user organisations found", "userOrganisation"));
        }
        res.status(200).json(organisations);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error("error getting user organisations", "userOrganisation"));
    }
};
exports.userOrganisations = userOrganisations;
const enterOrganisation = async (req, res, db) => {
    if (!req.session.userId)
        return res.status(404).json((0, helpers_1.error)("unauthorised access", "unauthenticated"));
    const { name } = req.body;
    if (!name)
        return res.status(400).json((0, helpers_1.error)("no name provided", "userOrganisation"));
    try {
        const org_user = await db("org_user").select("*").where({ user_id: req.session.userId, name: name });
        if (!org_user || !org_user.length) {
            return res.status(400).json((0, helpers_1.error)("no organisation found", "userOrganisation"));
        }
        req.session.organisationId = org_user[0].org_id;
        delete org_user[0].user_id;
        delete org_user[0].org_id;
        res.status(200).json(org_user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error("error entering organisation", "userOrganisation"));
    }
};
exports.enterOrganisation = enterOrganisation;
const organisations = async (req, res, db) => {
    if (!req.session.userId)
        return res.status(404).json((0, helpers_1.error)("unauthorised access", "unauthenticated"));
    try {
        const organisations = await db("organisation").select("public_id", "name", "image", "description", "website", "email", "phone", "address", "postcode", "city", "country", "latitude", "longitude", "created_at", "updated_at", "deleted_at");
        res.status(200).json(organisations);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error("error getting organisations", "organisations"));
    }
};
exports.organisations = organisations;
const addUserToOrg = async (req, res, db) => {
    if (!req.session.userId)
        return res.status(404).json((0, helpers_1.error)("unauthorised access", "unauthenticated"));
    if (!req.session.adminId)
        return res.status(404).json((0, helpers_1.error)("unauthorised access", "unauthenticated"));
    const { profile_id, name } = req.body;
    const user = await db("user").select("id").where({ profile_id: profile_id });
    if (!user || !user.length) {
        return res.status(400).json((0, helpers_1.error)("no user found", "addUserToOrg"));
    }
    try {
        const organisation = (await db("org_user").select("*").where({ user_id: user[0].id, name: name }));
        if (organisation || organisation.length) {
            return res.status(400).json((0, helpers_1.error)("user already in organisation", "addUserToOrg"));
        }
        await db("org_user")
            .insert({
            user_id: user[0].id,
            org_id: req.session.organisationId,
            role: "member",
            name: name,
        })
            .then(() => res.status(200).json("user added successfully"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error("error getting organisations", "addUserToOrg"));
    }
};
exports.addUserToOrg = addUserToOrg;
//# sourceMappingURL=organisation.js.map