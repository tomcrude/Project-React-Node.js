export const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const path = require("path")

const midd = express()

// Here are all the middlewares that my API use.

midd.use(bodyParser.urlencoded({ extended: true }));
midd.use(morgan("dev"));
midd.use(cors())
midd.use(express.json())

midd.use(express.static(path.join(__dirname, "../../public/images")))
midd.use(express.static(path.join(__dirname, "../../public/videos")))


module.exports = {midd}
