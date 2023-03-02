const {DataTypes} = require("sequelize")
export const {sequelizeCon} = require("../sequelize")

// "videos" table.

export const userProject = sequelizeCon.define("videos",{
    id:{
        type: DataTypes.BIGINT, 
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title:{
        type: DataTypes.STRING, 
        allowNull: false,
    },
    des:{
        type: DataTypes.STRING, 
        allowNull: false,
    },
    video:{
        type: DataTypes.BLOB, 
        allowNull: false,
    },
    user:{
        type: DataTypes.DECIMAL, 
        allowNull: true,
    },
    likes:{
        type: DataTypes.ARRAY(DataTypes.DECIMAL), 
        allowNull: true
    },},
{
timestamps: false
})