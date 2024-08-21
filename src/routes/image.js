"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const images_controllers_1 = require("../controllers/images.controllers");
const image = (0, express_1.Router)();
image.post('/upload', images_controllers_1.upload);
exports.default = image;
