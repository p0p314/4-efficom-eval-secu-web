const {bdd} = require('../framework/connection.js');
const {DataTypes} = require('sequelize');

let Blacklist = bdd.define('blacklist',{
    ip: {
        type: DataTypes.STRING(255)
    },
    
});

module.exports = Blacklist;
