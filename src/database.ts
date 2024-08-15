import mongoose from "mongoose";

export const  db = async () => {
    try {
       await mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/mascotaApp');
        console.log('Conectado a la Base De Datos');
    } catch (error) {
        console.error('Error al conectar a MongoDB', error);
        process.exit(1);
    }
}

