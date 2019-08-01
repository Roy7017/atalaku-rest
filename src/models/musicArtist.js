const db = require('../db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const Model = Sequelize.Model;

class MusicArtist extends Model {}

MusicArtist.init({

}, {
    sequelize,
    modelName: 'music_artist'
});

module.exports = MusicArtist;