const db = require("../db");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Model = Sequelize.Model;
class Movie extends Model{}

Movie.init({
   title: {
       type: Sequelize.STRING,
       allowNull: false
   },
    description: Sequelize.TEXT,
    rating: Sequelize.STRING,
    director: Sequelize.STRING,
    producer: Sequelize.STRING,
    writer: Sequelize.STRING,
    release_date: Sequelize.DATE,
    studio: Sequelize.STRING,
    thummnail_url: {
       type: Sequelize.STRING,
        validate:{
           isUrl: true
        }
    },
    cdn_link: {
       type: Sequelize.STRING,
        validate: {
           isUrl: true
        }
    },
    duration: Sequelize.INTEGER
}, {
    sequelize,
    modelName: 'movie'
});

module.exports = Movie;
