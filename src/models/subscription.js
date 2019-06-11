

const db = require("../db");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Model = Sequelize.Model;
class Subscripition extends Model{

}

Subscripition.init({
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    expiryDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    plan: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'subscription'
});

module.exports = Subscripition;


