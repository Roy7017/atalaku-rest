const db = require('../db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const Model = Sequelize.Model;

class Album extends Model{}

Album.init({
    name: {
        type: Sequelize.STRING,
        unique: true
    } 
},
{
    sequelize, 
    modelName: 'album'
});

module.exports = Album;