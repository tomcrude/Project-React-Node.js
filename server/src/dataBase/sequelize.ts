const Sequelize  = require("sequelize")
const config = require("../config")

// Connects to the database.

export const sequelizeCon = new Sequelize(config.database,config.user,config.password,{
  host: config.host,
  dialect: "postgres"
})