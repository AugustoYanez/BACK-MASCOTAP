"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./database");
const path_1 = __importDefault(require("path"));
const cors = require('cors');
const multer_1 = require("./middleware/multer");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// Middleware
app.use(cors());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'public/uploads')));
app.use(multer_1.upload.single('file'));
// Conectar a la base de datos
(0, database_1.db)();
// Rutas
app.use('/', routes_1.default);
app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
