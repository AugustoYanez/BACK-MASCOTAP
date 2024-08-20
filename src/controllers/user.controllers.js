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
exports.eliminarMascota = exports.editarMascota = exports.agregarMascota = exports.traerMascota = exports.traerMascotas = exports.perfil = void 0;
const auth_models_1 = require("../models/auth.models");
const auth_models_2 = require("../models/auth.models");
const mongoose_1 = __importDefault(require("mongoose"));
const perfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.payload;
        // Encuentra al usuario y puebla las mascotas
        const found = yield auth_models_1.Usuario.findOne({ email }).populate('mascotas').exec();
        if (!found) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json(found);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el perfil' });
    }
});
exports.perfil = perfil;
const traerMascotas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.payload;
        const found = yield auth_models_1.Usuario.findOne({ _id }).populate('mascotas').exec();
        if (!found) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json(found.mascotas);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.traerMascotas = traerMascotas;
const traerMascota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const found = yield auth_models_2.Mascota.findOne({ _id: id });
        if (!found) {
            res.status(404).json({ error: 'Mascota no encontrado' });
            return;
        }
        res.status(200).json(found);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.traerMascota = traerMascota;
const agregarMascota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { placaID, nombre, apodo, estado, edad, descripcion, imagen, caracteristicas } = req.body;
        const { _id } = req.payload;
        const usuario = yield auth_models_1.Usuario.findById({ _id }).populate('mascotas');
        if (!usuario) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        // Comprobar si la mascota ya existe
        const mascotasPobladas = yield auth_models_2.Mascota.find({ _id: { $in: usuario.mascotas } });
        const mascotaExistente = mascotasPobladas.find(mascota => mascota.placaID === placaID);
        if (mascotaExistente) {
            res.status(400).json({ error: 'Ya tienes una mascota con ese placaID' });
            return;
        }
        // Crear una nueva instancia de la mascota  
        const nuevaMascota = new auth_models_2.Mascota({
            placaID,
            nombre,
            apodo,
            estado,
            edad,
            descripcion,
            imagen,
            caracteristicas
        });
        // Guardar la nueva mascota en la base de datos  
        const mascotaGuardada = yield nuevaMascota.save();
        // Agregar la mascota guardada al usuario  
        usuario.mascotas.push(new mongoose_1.default.Types.ObjectId(mascotaGuardada._id));
        yield usuario.save();
        res.status(201).json(mascotaGuardada);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar la mascota' });
    }
});
exports.agregarMascota = agregarMascota;
const editarMascota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, placaID, nombre, apodo, estado, edad, descripcion, imagen, caracteristicas } = req.body;
        const user = req.payload;
        const usuario = yield auth_models_1.Usuario.findById({ _id: user._id }).populate('mascotas');
        const mascota = yield auth_models_2.Mascota.findOneAndReplace({ _id }, {
            placaID,
            nombre,
            apodo,
            estado,
            edad,
            descripcion,
            imagen,
            caracteristicas
        });
        if (!usuario) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.status(204).json("mascota editada correctamente");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al editar la mascota' });
    }
});
exports.editarMascota = editarMascota;
const eliminarMascota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.payload;
        const { id } = req.params;
        // Buscar al usuario
        const usuario = yield auth_models_1.Usuario.findById({ _id }).populate('mascotas');
        if (!usuario) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        // Verificar que la mascota pertenece al usuario
        const mascotaIndex = usuario.mascotas.findIndex(mascotaId => mascotaId._id.toString() === id);
        if (mascotaIndex === -1) {
            res.status(404).json({ error: 'Mascota no encontrada en el perfil del usuario' });
            return;
        }
        // Eliminar la mascota de la colección Mascota
        yield auth_models_2.Mascota.findByIdAndDelete(id);
        // Eliminar la referencia de la mascota del usuario
        usuario.mascotas.splice(mascotaIndex, 1);
        yield usuario.save();
        res.status(200).json({ message: 'Mascota eliminada correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la mascota' });
    }
});
exports.eliminarMascota = eliminarMascota;
