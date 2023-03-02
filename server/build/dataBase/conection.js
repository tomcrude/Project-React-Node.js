"use strict";
const { Pool } = require("pg");
const config = require("../config");
// Connects to the database.
var pool = new Pool({
    connectionLimit: 50,
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
});
module.exports = pool;
