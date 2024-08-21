"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "secet", (err, user) => {
        if (err)
            return res.sendStatus(403).json(err);
        if (user) {
            req.payload = user;
            next();
        }
        else {
            res.sendStatus(500); // or any other appropriate status code
        }
    });
};
exports.authenticateToken = authenticateToken;
