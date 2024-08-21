"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateToken_1 = require("../middleware/validateToken");
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const user_controllers_1 = require("../controllers/user.controllers");
const mascota_schema_1 = require("../schema/mascota.schema");
const params_schema_1 = require("../schema/params.schema");
const user = (0, express_1.Router)();
user.get('/perfil', validateToken_1.authenticateToken, user_controllers_1.perfil);
user.get('/mascotas', validateToken_1.authenticateToken, user_controllers_1.traerMascotas);
user.get('/mascotas/:id', validateToken_1.authenticateToken, (0, validateSchema_1.default)(params_schema_1.idSchema), user_controllers_1.traerMascota);
user.post('/mascotas', validateToken_1.authenticateToken, (0, validateSchema_1.default)(mascota_schema_1.registerMascota), user_controllers_1.agregarMascota);
user.put('/mascotas', validateToken_1.authenticateToken, (0, validateSchema_1.default)(mascota_schema_1.registerMascota), user_controllers_1.editarMascota);
user.delete('/mascotas/:id', validateToken_1.authenticateToken, (0, validateSchema_1.default)(params_schema_1.idSchema), user_controllers_1.eliminarMascota);
exports.default = user;
