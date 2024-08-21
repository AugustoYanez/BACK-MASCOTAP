"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccesToken = createAccesToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TOKEN_SECRET = process.env.TOKEN_SECRET || "secet";
function createAccesToken(payload) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, TOKEN_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err)
                reject(err);
            resolve(token);
        });
    });
}
