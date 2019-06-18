const db = require("../db");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Model = Sequelize.Model;
class BlogPostLike extends Model{}

BlogPostLike.init({

}, {
    sequelize,
    modelName: 'blog_post_like'
});
module.exports = BlogPostLike;
