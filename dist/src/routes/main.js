"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const express_1 = __importDefault(require("express"));
const configs_1 = require("../configs/configs");
const auth_1 = require("../controllers/auth");
exports.main = express_1.default.Router();
exports.main.get("/", (_req, res) => {
    res.json("tello clone");
});
exports.main.post("/register", (req, res) => {
    return (0, auth_1.register)(req, res, configs_1.db);
});
exports.main.post("/login", (req, res) => {
    return (0, auth_1.login)(req, res, configs_1.db);
});
//# sourceMappingURL=main.js.map