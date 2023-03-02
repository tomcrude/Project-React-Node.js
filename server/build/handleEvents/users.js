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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.readDir = exports.writeFile = exports.unLink = exports.detectNamePass = exports.securePass = void 0;
const pool = require("../dataBase/conection.js");
_a = require("../functions/function.js"), exports.securePass = _a.securePass, exports.detectNamePass = _a.detectNamePass, exports.unLink = _a.unLink, exports.writeFile = _a.writeFile, exports.readDir = _a.readDir, exports.readFile = _a.readFile;
const imagePath = "../../public/images/";
// Create User
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, pass, mail, role } = req.body;
    const token = Math.round(Math.random() * 10000) + "-" + name;
    let verificationPass = yield (0, exports.securePass)(pass);
    if ((0, exports.detectNamePass)(name) || (0, exports.detectNamePass)(pass)) {
        return res.json("The username and password must have at least 3 characters and a maximum of 12.");
    }
    if (verificationPass === false) {
        return res.json("The password must have at least one capital letter.");
    }
    if (mail == null || mail == undefined || mail.length < 4 || mail.length > 257) {
        return res.json("Enter an email correctly.");
    }
    if (role == null || role == undefined || role !== "student" && role !== "teacher") {
        return res.json("Enter a role");
    }
    pool.query(`SELECT name FROM users WHERE mail = $1`, [mail], (e, rows) => {
        if (e)
            return res.json("Error creating users");
        if (rows.rows.length > 0) {
            return res.json("The mail is already taken.");
        }
        else {
            pool.query(`INSERT INTO users (name,pass,mail,role,token,followers,videos) VALUES ($1,$2,$3,$4,$5,array[(0)],array[(0)])`, [name, pass, mail, role, token], (e, _rows) => {
                if (e)
                    return console.log(e);
                res.json("User created");
            });
        }
    });
});
// Sign IN
const signIn = (req, res) => {
    const { mail, pass } = req.body;
    if (mail == null || mail == undefined || mail.length == 0 || mail.length > 255 || pass.length > 13 || pass == null || pass == undefined || pass.length < 4) {
        return res.json(["The data entered is incorrect"]);
    }
    pool.query("SELECT mail,pass,token,id FROM users WHERE mail = $1 AND pass = $2", [mail, pass], (e, rows) => {
        if (e)
            return res.json(e);
        if (rows.rows.length > 0) {
            res.json(["Access allowed", rows.rows[0]]);
        }
        else {
            res.json(["Incorrect username or password."]);
        }
    });
};
// GET user
const getUser = (req, res) => {
    const { id, token, userId } = req.params;
    pool.query("SELECT name FROM users WHERE token = $1", [token], (e, rows) => {
        if (e)
            return res.json(e);
        if (rows.rows.length > 0) {
            pool.query(`SELECT id, name, pass, mail, token, role, followers, following,"imageURL" from users WHERE id = $1`, [id], (e, rows) => {
                if (e)
                    return res.json(e);
                if (rows.rows.length <= 0) {
                    return res.json("noUser");
                }
                pool.query(`SELECT id,title,des FROM videos WHERE "user" = $1`, [id], (e, row) => {
                    if (e)
                        return res.json(e);
                    if (rows.rows.length <= 0) {
                        return res.json([rows.rows[0], { title: "Suscribe", color: "primary" }, ["No videos"]]);
                    }
                    if (rows.rows[0].followers.includes(+userId)) {
                        return res.json([rows.rows[0], { title: "Unsuscribe", color: "error" }, row.rows]);
                    }
                    else {
                        return res.json([rows.rows[0], { title: "Suscribe", color: "primary" }, row.rows]);
                    }
                });
            });
        }
        else
            return res.json("You are not authorized");
    });
};
// GET header
const getHeader = (req, res) => {
    const { id, token } = req.params;
    pool.query("SELECT name FROM users WHERE token = $1", [token], (e, rows) => {
        if (e)
            return res.json(e);
        if (rows.rows.length > 0) {
            pool.query(`SELECT "imageURL" from users WHERE id = $1`, [id], (e, rows) => {
                if (e)
                    return res.json(e);
                if (rows.rows.length <= 0) {
                    return res.json("noUser");
                }
                res.json(rows.rows[0]);
            });
        }
        else
            return res.json("You are not authorized");
    });
};
// Change user image
const changeUserImage = (req, res) => {
    const { token } = req.params;
    if (req.file.mimetype === null) {
        res.json("Error");
    }
    pool.query("SELECT id,name FROM users WHERE token = $1", [token], (e, rows) => {
        if (e)
            return res.json(e);
        if (rows.rows.length > 0) {
            const id = rows.rows[0].id;
            const type = req.file.mimetype;
            const imgData = (0, exports.readFile)(imagePath, req.file.filename);
            if (type !== "image/png" && type !== "image/jpeg" && type !== "image/jpg" || req.file.size > 500000) {
                (0, exports.unLink)(imagePath, req.file.filename);
                return res.json("The image must be PNG/JPG/JPEG and should not weigh more than 0.5 mb.");
            }
            pool.query(`UPDATE users SET image = $1, "imageURL" = $2 WHERE token = $3`, [imgData, "true", token], (e, _rows) => {
                if (e)
                    return res.json(e);
                (0, exports.unLink)(imagePath, req.file.filename);
                (0, exports.writeFile)(imagePath, id, imgData, "-image.png");
                (0, exports.readDir)(imagePath);
                res.json("Image upload");
            });
        }
        else
            return res.json("You are not authorized");
    });
};
// Suscribe - Like
const suscribe = (req, res) => {
    const { id, token, chanelId, target, table } = req.body;
    pool.query("SELECT name FROM users WHERE token = $1", [token], (e, rows) => {
        if (e)
            return res.json(e);
        if (rows.rows.length > 0) {
            pool.query(`SELECT ${target} from ${table} WHERE id = $1`, [+chanelId], (e, rows) => __awaiter(void 0, void 0, void 0, function* () {
                if (e) {
                    return res.json(e);
                }
                let record;
                if (target === "followers") {
                    record = rows.rows[0].followers;
                }
                else {
                    record = rows.rows[0].likes;
                }
                const find = record.includes(+id);
                record.push(id);
                if (find === true) {
                    let data = yield record.filter((stat) => stat != id);
                    console.log(typeof record, typeof data);
                    pool.query(`UPDATE ${table} SET ${target}=array[${data}] WHERE id = $1`, [chanelId], (e, _rows) => {
                        if (e)
                            return console.log(e);
                        res.json("success");
                    });
                }
                else {
                    pool.query(`UPDATE ${table} SET ${target}=array[${record}] WHERE id = $1`, [chanelId], (e, _rows) => {
                        if (e)
                            return console.log(e);
                        res.json("success");
                    });
                }
            }));
        }
        else
            return res.json("You are not authorized");
    });
};
const methods = {
    create,
    signIn,
    suscribe,
    changeUserImage,
    getUser,
    getHeader,
};
module.exports = methods;
