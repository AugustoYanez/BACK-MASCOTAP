import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import { db } from "./database";
import path from "path";
const cors = require('cors')
import multer from "multer";
import { upload } from "./middleware/multer";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(upload.single('file'))


// Conectar a la base de datos
db();

// Rutas
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
