const Sequelize = require('sequelize');

const sequelize = new Sequelize('atalaku', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.DEFAULT_OFFSET = 0;
db.DEFAULT_LIMIT = 50;
db.DEFAULT_SORT_COLUMN = 'id';
db.DEFAULT_SORT_DIRECTION = 'ASC';

module.exports = db;
