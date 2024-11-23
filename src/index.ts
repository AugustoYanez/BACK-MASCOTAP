import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import { db } from "./database";
import path from "path";
const cors = require('cors');
import multer from "multer";
import { upload } from "./middleware/multer";

// Configurar dotenv para cargar el archivo de entorno correcto
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

const app = express();
const PORT = process.env.PORT || 3000;
console.log('PORT', PORT);
console.log('DATABSE', process.env.DATABASE);
// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(upload.single('file'));

// Conectar a la base de datos
db();

// Rutas
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
