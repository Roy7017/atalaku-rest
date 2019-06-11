const db = require("../db");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Model = Sequelize.Model;
class MusicVideoComment extends Model{}
MusicVideoComment.init({
    comment: Sequelize.TEXT
}, {
    sequelize,
    modelName: 'music_video_comment'
});

module.exports = MusicVideoComment;
