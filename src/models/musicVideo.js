const db = require("../db");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Model = Sequelize.Model;
class MusicVideo extends Model{}

MusicVideo.init({
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    artist: {
        type: Sequelize.STRING,
        allowNull: false
    },
    album: Sequelize.STRING,
    year: {
        type: Sequelize.STRING,
        validate: {
            len: 4,
            isNumeric: true
        }
    },
    disc_num: Sequelize.INTEGER,
    composer: Sequelize.STRING,
    album_artist: {
        type: Sequelize.STRING
    },
    duration: Sequelize.INTEGER,
    cdn_link: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    },
    views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    thumbnail_url: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    }
}, {
    sequelize,
    modelName: 'music_video'
});

module.exports = MusicVideo;
