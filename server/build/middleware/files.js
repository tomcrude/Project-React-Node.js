"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Videoupload = exports.fileupload = void 0;
const multer = require('multer');
const path = require("path");
// Here the folders where the videos and images will be store are created.
const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, "../../public/images"),
    filename: (_, file, cb) => {
        cb(null, "image-" + file.originalname);
    }
});
const diskvideostorage = multer.diskStorage({
    destination: path.join(__dirname, "../../public/videos"),
    filename: (_, file, cb) => {
        cb(null, "video-" + file.originalname);
    }
});
// Here the videos and images are save.
exports.fileupload = multer({
    storage: diskstorage
}).single("image");
exports.Videoupload = multer({
    storage: diskvideostorage
}).single("video");
module.exports = {
    fileupload: exports.fileupload,
    Videoupload: exports.Videoupload
};
