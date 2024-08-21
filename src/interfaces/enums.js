"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estado = exports.Rol = exports.Contacto = exports.Documento = void 0;
var Documento;
(function (Documento) {
    Documento["Dni"] = "DNI";
    Documento["Cuil"] = "CUIL";
    Documento["Pasaporte"] = "PASAPORTE";
})(Documento || (exports.Documento = Documento = {}));
var Contacto;
(function (Contacto) {
    Contacto["Whatsapp"] = "WHATSAPP";
    Contacto["Sms"] = "SMS";
    Contacto["Email"] = "EMAIL";
})(Contacto || (exports.Contacto = Contacto = {}));
var Rol;
(function (Rol) {
    Rol["Administrador"] = "ADMINISTRADOR";
})(Rol || (exports.Rol = Rol = {}));
var Estado;
(function (Estado) {
    Estado["EnCasa"] = "EN MI HOGAR";
    Estado["Adoptada"] = "LO ENCONTRE";
    Estado["Perdida"] = "LO PERDI";
})(Estado || (exports.Estado = Estado = {}));
