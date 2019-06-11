const db = require("../db");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Model = Sequelize.Model;
class BlogPost extends Model{}
BlogPost.init({
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
    },
    thumbnailUrl:{
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    },
    text: Sequelize.TEXT
}, {
    sequelize,
    modelName: 'blog_post'
});

module.exports = BlogPost;
