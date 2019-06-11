const db = require("../db");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Model = Sequelize.Model;
class BlogPostComment extends Model{}

BlogPostComment.init({
   comment: Sequelize.TEXT
}, {
    sequelize,
    modelName: 'blog_post_comment'
});
module.exports = BlogPostComment;
