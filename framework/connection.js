const Sequelize = require('sequelize');
require('dotenv').config();

let bdd = new Sequelize(process.env.BDD_NAME, process.env.BDD_USER, process.env.BDD_PASSWORD, {
    dialect: process.env.BDD_DRIVER,
    host: process.env.BDD_HOST
});

let connect = async () => {
    await bdd.authenticate();
    console.log('Connection to database has been established successfully');
}

module.exports = { connect, bdd };