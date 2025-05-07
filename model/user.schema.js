const {bdd} = require('./../framework/connection.js');
const {DataTypes} = require('sequelize');

let User = bdd.define('user',{
    email: {
        type: DataTypes.STRING(255),
        unique: true
    },
    password: {
        type: DataTypes.STRING(255)
    }
});

module.exports = User;