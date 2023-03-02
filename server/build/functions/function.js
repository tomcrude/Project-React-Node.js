"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.pool = require("../dataBase/conection.js");
const fs = require("fs");
const path = require("path");
// Delete the file.
function unLink(data, file) {
    fs.unlinkSync(path.join(__dirname, data + file));
}
// Create the file.
function writeFile(data, id, imgData, type) {
    fs.writeFileSync(path.join(__dirname, data + id + type), imgData);
}
// Read the file.
function readDir(data) {
    fs.readdirSync(path.join(__dirname, data));
}
// Read the file.
function readFile(data, file) {
    return fs.readFileSync(path.join(__dirname, data + file));
}
// Detects if the password has no uppercase letters.
function securePass(pass) {
    let lastLetter = 0;
    let result = true;
    pass.split("").filter((stat) => {
        lastLetter = lastLetter + 1;
        let x = 0;
        if (stat === stat.toUpperCase() && stat !== "1" && stat !== "2" && stat !== "3" && stat !== "4" && stat !== "5"
            && stat !== "6" && stat !== "7" && stat !== "8" && stat !== "9" && stat !== "0") {
            x = x + 1;
            result = true;
        }
        else if (lastLetter == pass.length) {
            return result = false;
        }
    });
    return result;
}
// Verify if the data entered by the user is correct.
function detectNamePass(value) {
    if (value == null || value == undefined || value.length < 4 || value.length > 13) {
        return true;
    }
}
function detectTitleDes(title, des) {
    if (title == null || title == undefined || title.length > 21 || title.length < 5 || des.length > 256 || des.length < 5 || des == null || des == undefined) {
        return true;
    }
}
module.exports = {
    securePass,
    detectNamePass,
    detectTitleDes,
    unLink,
    readDir,
    readFile,
    writeFile,
};
