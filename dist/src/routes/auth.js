"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = __importDefault(require("express"));
const configs_1 = require("../configs/configs");
const auth_1 = require("../controllers/auth");
exports.auth = express_1.default.Router();
exports.auth.post("/register", (req, res) => {
    return (0, auth_1.register)(req, res, configs_1.db);
});
exports.auth.post("/login", (req, res) => {
    return (0, auth_1.login)(req, res, configs_1.db);
});
exports.auth.post("/logout", (req, res) => {
    return (0, auth_1.logout)(req, res);
});
exports.auth.post("/test", (req, res) => {
    return (0, auth_1.testSessions)(req, res);
});
//# sourceMappingURL=auth.js.map