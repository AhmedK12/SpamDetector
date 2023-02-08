const Sequelize = require('sequelize')

const sequelize = require('../config/database')



const numberModel = sequelize.define("Number",{
    name : {
        type : Sequelize.STRING,
        allowNull : true,
        trim:true,
        unique:false
        
    },

    phone : {
        type : Sequelize.STRING,
        allowNull : false,
        trim:true, 
        unique:false

    },
    

    spam : {
        type : Sequelize.BOOLEAN,
        defaultValue: false,
    },
    contactOf:{
        type : Sequelize.STRING,
        allowNull : true,
        trim:true,
        unique:false
    }


});

module.exports = numberModel