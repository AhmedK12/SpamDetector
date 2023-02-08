const Sequelize = require('sequelize')

const sequelize = require('../config/database')



const userModel = sequelize.define("user",{
    name : {
        type : Sequelize.STRING,
        allowNull : true,
        trim:true,
        
    },

    phone : {
        type : Sequelize.STRING,
        allowNull : false,
        trim:true,
        unique:true,

    },
    email : {
        type : Sequelize.STRING,
        allowNull :true,
        trim:true,
    },

    password :{
        type: Sequelize.STRING,
        allowNull:true
    },

});

module.exports = userModel