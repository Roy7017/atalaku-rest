const db = require('../db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const Model = Sequelize.Model;

class Admin extends Model{}

Admin.init({
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    permissions: Sequelize.STRING
},
{
    sequelize,
    modelName: 'admin'
});

module.exports = Admin;