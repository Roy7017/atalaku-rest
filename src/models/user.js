const db = require("../db");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Model = Sequelize.Model;
class User extends Model{}

User.init({
    //attributes
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    tel: Sequelize.INTEGER,
    country: Sequelize.STRING,
    expiryDate: {
        type: Sequelize.DATE,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'user'
});

module.exports = User;


