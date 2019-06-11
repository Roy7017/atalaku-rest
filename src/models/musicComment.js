const db = require("../db");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Model = Sequelize.Model;
class MusicComment extends Model{}
MusicComment.init({
    comment: Sequelize.TEXT
}, {
    sequelize,
    modelName: 'music_comment'
});

module.exports = MusicComment;
