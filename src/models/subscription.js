

const db = require("../db");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Model = Sequelize.Model;
class Subscripition extends Model{

}

Subscripition.init({
    frequency: {
        type: Sequelize.STRING,
        allowNull: false
    },
    plan: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'subscription'
});

module.exports = Subscripition;


