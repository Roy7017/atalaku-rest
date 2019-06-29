const db = require('../db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const Model = Sequelize.Model;

class Album extends Model{}

Album.init({
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    artist: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
    year: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: 4,
            isNumeric: true
        }
    },
    thumbnail_url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
},
{
    sequelize, 
    modelName: 'album'
});

module.exports = Album;