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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.pool = require("../dataBase/conection.js");
const { unLink, writeFile, readDir, readFile, detectTitleDes } = require("../functions/function.js");
const videoPath = "../../public/videos/";
// CREATE videos
const createVideos = (req, res) => {
    const { token, title, des } = req.params;
    if (req.file.mimetype !== "video/mp4" || req.file.mimetype === null || req.file.size > 10000000) {
        unLink(videoPath, req.file.filename);
        return res.json("The video must be MP4 and should not weigh more than 10 mb.");
    }
    if (detectTitleDes(title, des) === true) {
        return res.json("The title must have between 4 and 20 characters and the description between 4 and 255 characters.");
    }
    exports.pool.query("SELECT id,name FROM users WHERE token = $1", [token], (e, rows) => __awaiter(void 0, void 0, void 0, function* () {
        if (e)
            return res.json(e);
        if (rows.rows.length > 0) {
            const id = rows.rows[0].id;
            const videoData = readFile(videoPath, req.file.filename);
            exports.pool.query(`INSERT INTO videos (title,des,video,"user",likes) VALUES ($1,$2,$3,$4,array[(0)]) RETURNING id`, [title, des, videoData, id], (e, rows) => {
                if (e)
                    return console.log(e);
                const videoId = rows.rows[0].id;
                unLink(videoPath, req.file.filename);
                writeFile(videoPath, videoId, videoData, "-video.mp4");
                readDir(videoPath);
                exports.pool.query("SELECT videos FROM users WHERE token = $1", [token], (e, rows) => {
                    if (e)
                        return res.json(e);
                    const record = rows.rows[0].videos;
                    record.push(videoId);
                    exports.pool.query(`UPDATE users SET videos = array[${record}] WHERE token = $1`, [token]);
                    res.json(["success", videoId]);
                });
            });
        }
        else
            return res.json("You are not authorized");
    }));
};
// GET ALL Videos
const getVideos = (req, res) => {
    const { token } = req.params;
    exports.pool.query("SELECT name FROM users WHERE token = $1", [token], (e, rows) => {
        if (e)
            return res.json(e);
        if (rows.rows.length > 0) {
            exports.pool.query("SELECT id,title,des FROM videos", (e, rows) => {
                if (e)
                    return res.json(e);
                res.json(rows.rows);
            });
        }
        else
            return res.json("You are not authorized");
    });
};
// GET single video
const getSingleVideo = (req, res) => {
    const { token, id, userId } = req.params;
    exports.pool.query("SELECT name FROM users WHERE token = $1", [token], (e, rows) => {
        if (e)
            return res.json(e);
        if (rows.rows.length > 0) {
            exports.pool.query(`SELECT videos.id,title,des,"user",likes,name,"imageURL" FROM videos INNER JOIN users ON videos.user = users.id WHERE videos.id = $1`, [id], (e, rows) => {
                if (e)
                    return res.json(e);
                if (rows.rows.length > 0) {
                    if (rows.rows[0].likes.includes(+userId)) {
                        return res.json([rows.rows[0], { title: "Dislike", color: "rgb(255,255,255)" }]);
                    }
                    else {
                        return res.json([rows.rows[0], { title: "Like", color: "rgb(0,0,0)" }]);
                    }
                }
                else {
                    return res.json("denegate");
                }
            });
        }
        else
            return res.json("You are not authorized");
    });
};
// UPDATE video
const updateVideo = (req, res) => {
    const { id } = req.params;
    const { token, title, des, userId } = req.body;
    if (detectTitleDes(title, des) === true) {
        return res.json("The title must have between 4 and 20 characters and the description between 4 and 255 characters.");
    }
    exports.pool.query("SELECT name FROM users WHERE token = $1", [token], (e, rows) => {
        if (e)
            return res.json(e);
        if (rows.rows.length > 0) {
            exports.pool.query(`SELECT "user" FROM videos WHERE "user" = $1 AND id = $2`, [userId, id], (e, rows) => {
                if (e)
                    return res.json(e);
                if (rows.rows.length > 0) {
                    exports.pool.query(`UPDATE public.videos SET title=$1, des=$2 WHERE id = $3`, [title, des, id], (e) => {
                        if (e)
                            return res.json(e);
                        res.json("success");
                    });
                }
                else {
                    return res.json("You are not authorized");
                }
            });
        }
        else
            return res.json("You are not authorized");
    });
};
// GET users videos
const getUserVideos = (req, res) => {
    const { token, id, userId } = req.params;
    exports.pool.query("SELECT name FROM users WHERE token = $1", [token], (e, rows) => {
        if (e)
            return res.json(e);
        if (rows.rows.length > 0) {
            exports.pool.query(`SELECT id,title,des FROM videos WHERE id = $1 AND "user" = $2`, [id, userId], (e, rows) => {
                if (e)
                    return res.json(e);
                if (rows.rows.length <= 0) {
                    return res.json("You are not authorized");
                }
                res.json(rows.rows[0]);
            });
        }
        else
            return res.json("You are not authorized");
    });
};
// DELETE video info
const deleteVideo = (req, res) => {
    const { token, id, userId } = req.body;
    exports.pool.query("SELECT name,videos FROM users WHERE token = $1", [token], (e, rows) => {
        if (e)
            return res.json(e);
        if (rows.rows.length > 0) {
            const videoData = rows.rows[0].videos.filter((stat) => stat != id);
            exports.pool.query("DELETE FROM videos WHERE id = $1", [id], (e, _rows) => {
                if (e)
                    return res.json(e);
                exports.pool.query("UPDATE users SET videos=$1 WHERE id = $2", [videoData, userId], (e, _rows) => {
                    if (e)
                        return res.json(e);
                    res.json("success");
                });
            });
        }
        else
            return res.json("You are not authorized");
    });
};
const methods = {
    deleteVideo,
    createVideos,
    getVideos,
    getSingleVideo,
    getUserVideos,
    updateVideo
};
module.exports = methods;
