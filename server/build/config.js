"use strict";
const doten = require("dotenv");
doten.config();
//DataBase keys (PostgreSQL)
module.exports = {
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || "",
};
