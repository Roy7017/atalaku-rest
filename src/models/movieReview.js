const db = require("../db");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Model = Sequelize.Model;
class MovieReview extends Model{}
MovieReview.init({
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        }
    },
    comment: Sequelize.TEXT
}, {
    sequelize,
    modelName: 'movie_review'
});

module.exports = MovieReview;
