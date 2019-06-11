const db = require("../db");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Model = Sequelize.Model;
class MusicLike extends Model{}

MusicLike.init({

}, {
    sequelize,
    modelName: 'music_like'
});

module.exports = MusicLike;
