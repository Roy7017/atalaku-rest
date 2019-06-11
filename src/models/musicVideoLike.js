const db = require("../db");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Model = Sequelize.Model;
class MusicVideoLike extends Model{}

MusicVideoLike.init({

}, {
    sequelize,
    modelName: 'music_video_like'
});

module.exports = MusicVideoLike;
