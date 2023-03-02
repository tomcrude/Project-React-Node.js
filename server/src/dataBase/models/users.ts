const {DataTypes} = require("sequelize")
export const {sequelizeCon} = require("../sequelize")

// "users" table.

export const userProject = sequelizeCon.define("users",{
    id:{
        type: DataTypes.BIGINT, 
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING, 
        allowNull: false,
    },
    pass:{
        type: DataTypes.STRING, 
        allowNull: false,
    },
    mail:{
        type: DataTypes.STRING, 
        allowNull: false,
    },
    token:{
        type: DataTypes.STRING, 
        allowNull: false,
    },
    role:{
        type: DataTypes.STRING, 
        allowNull: false,
    },
    followers:{
        type: DataTypes.ARRAY(DataTypes.DECIMAL), 
        allowNull: true,
    },
    image:{
        type: DataTypes.BLOB, 
        allowNull: true,
    },
    videos:{
        type: DataTypes.ARRAY(DataTypes.DECIMAL), 
        allowNull: true,
    },
    imageURL:{
        type: DataTypes.STRING, 
        allowNull: true,
    },},
        {
        timestamps: false
    
})