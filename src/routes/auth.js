"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const auth_schema_1 = require("../schema/auth.schema");
const auth = (0, express_1.Router)();
auth.post('/login', (0, validateSchema_1.default)(auth_schema_1.loginSchema), auth_controllers_1.login);
auth.post('/register', (0, validateSchema_1.default)(auth_schema_1.registerSchema), auth_controllers_1.register);
exports.default = auth;
