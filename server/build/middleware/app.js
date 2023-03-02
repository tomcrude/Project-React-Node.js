"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.express = void 0;
exports.express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const midd = (0, exports.express)();
// Here are all the middlewares that my API use.
midd.use(bodyParser.urlencoded({ extended: true }));
midd.use(morgan("dev"));
midd.use(cors());
midd.use(exports.express.json());
midd.use(exports.express.static(path.join(__dirname, "../../public/images")));
midd.use(exports.express.static(path.join(__dirname, "../../public/videos")));
module.exports = { midd };
