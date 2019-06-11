const db = require("../db");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Model = Sequelize.Model;
class Genre extends Model{}

Genre.init({
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'genre'
});

module.exports = Genre;
