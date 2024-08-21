"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_models_1 = require("../models/auth.models");
const jwt_1 = require("../libs/jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, contrasena } = req.body;
        const found = yield auth_models_1.Usuario.findOne({ email });
        if (!found)
            return res.status(400).json(["No se encontro al usuario. "]);
        const match = yield bcrypt_1.default.compare(contrasena, found.contrasena);
        if (!match)
            return res.status(500).json(["Contraseña incorrecta. "]);
        const token = yield (0, jwt_1.createAccesToken)({
            _id: found._id,
            nombre: found.nombre,
            email: found.email,
        });
        res.json({ message: "Sesion iniciada correctamente.", token });
    }
    catch (error) {
        res.status(500).json({ mensajes: 'Error al iniciar sesion', error: [error] });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, apellido, documento, contacto, nroDocumento, telefono, email, contrasena, } = req.body;
        const found = yield auth_models_1.Usuario.findOne({ email });
        if (found)
            return res.status(400).json(["El e-mail ya esta en uso."]);
        const hash = yield bcrypt_1.default.hash(contrasena, 10);
        const log = yield new auth_models_1.Usuario({
            nombre,
            apellido,
            documento,
            contacto,
            nroDocumento,
            telefono,
            email,
            contrasena: hash,
        }).save();
        const token = yield (0, jwt_1.createAccesToken)({ _id: log._id, email: log.email });
        res.status(201).json({ message: "Registro correcto. ", token });
    }
    catch (error) {
        res.status(500).json({ mensajes: 'Error al registrarse', error: [error] });
    }
});
exports.register = register;
