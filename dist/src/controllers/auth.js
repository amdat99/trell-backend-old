"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSessions = exports.logout = exports.login = exports.register = void 0;
const uuid_random_1 = __importDefault(require("uuid-random"));
const argon2_1 = __importDefault(require("argon2"));
const helpers_1 = require("../helpers");
const register = async (req, res, db) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json((0, helpers_1.error)("incorrect form submission", "register"));
    }
    else if (password.length < 6) {
        return res.status(400).json((0, helpers_1.error)("password must be at least 6 characters", "register"));
    }
    const hashedPassword = await argon2_1.default.hash(password);
    const date = new Date();
    try {
        await db("user")
            .insert({
            id: (0, uuid_random_1.default)(),
            profile_id: (0, uuid_random_1.default)(),
            status: "offline",
            created_at: date,
            updated_at: date,
            name: name.toLowerCase(),
            email: email,
            password: hashedPassword,
        })
            .then(() => res.status(200).json("registered successfully"));
    }
    catch (err) {
        console.log(err),
            err.routine === "_bt_check_unique"
                ? res.status(400).json((0, helpers_1.error)("user already exists", "register"))
                : res.status(500).json((0, helpers_1.error)("error creating user", "register"));
    }
};
exports.register = register;
const login = async (req, res, db) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json((0, helpers_1.error)("incorrect form submission", "login"));
    }
    try {
        const user = await db("user").select("*").where({ email: email });
        if (!user || user.length === 0)
            return res.status(400).json({ error: "user not found", type: "login" });
        const valid = await argon2_1.default.verify(user[0].password, password);
        if (!valid) {
            return res.status(400).json({ error: "incorrect password", type: "login" });
        }
        req.session.userId = user[0].id;
        if (user[0].admin_id) {
            req.session.adminId = user[0].admin_id;
            delete user[0].admin_id;
        }
        delete user[0].password;
        delete user[0].id;
        return res.status(200).json(user[0]);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json((0, helpers_1.error)("error logging in", "login"));
    }
};
exports.login = login;
const logout = (req, res) => {
    try {
        req.session.destroy(() => {
            res.clearCookie("sid");
            res.status(200).json("logged out successfully");
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json((0, helpers_1.error)("error logging out", "logout"));
    }
};
exports.logout = logout;
const testSessions = (req, res) => {
    res.json({ id: req.session.userId });
};
exports.testSessions = testSessions;
//# sourceMappingURL=auth.js.map