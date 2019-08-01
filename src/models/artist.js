const db = require('../db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const Model = Sequelize.Model;

class Artist extends Model {}
Artist.init({
    name: {
        type : Sequelize.STRING,
        allowNull: false,
    }
},
{
    sequelize,
    modelName: 'artist'
});

module.exports = Artist;