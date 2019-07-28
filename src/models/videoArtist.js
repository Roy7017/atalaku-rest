const db = require('../db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const Model = Sequelize.Model;

class VideoArtist extends Model {}

VideoArtist.init({

}, {
    sequelize,
    modelName: 'video_artist'
});

module.exports = VideoArtist;