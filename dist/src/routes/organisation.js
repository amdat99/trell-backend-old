"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.org = void 0;
const express_1 = __importDefault(require("express"));
const configs_1 = require("../configs/configs");
const organisation_1 = require("../controllers/organisation");
exports.org = express_1.default.Router();
exports.org.post("/all", (req, res) => {
    return (0, organisation_1.organisations)(req, res, configs_1.db);
});
exports.org.post("/user", (req, res) => {
    return (0, organisation_1.userOrganisations)(req, res, configs_1.db);
});
exports.org.post("/enter", (req, res) => {
    return (0, organisation_1.enterOrganisation)(req, res, configs_1.db);
});
exports.org.post("/add", (req, res) => {
    return (0, organisation_1.addUserToOrg)(req, res, configs_1.db);
});
//# sourceMappingURL=organisation.js.map