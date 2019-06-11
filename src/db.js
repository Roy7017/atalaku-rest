const Sequelize = require('sequelize');

const sequelize = new Sequelize('atalaku', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
 module.exports = db;
