const db = require('../db');
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Model = Sequelize.Model;

class Documentary extends Model {}

Documentary.init({
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: Sequelize.STRING,
    
    video_url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            isUrl: true
        }
    }
},
{
    sequelize,
    modelName: 'documentary'
});

module.exports = Documentary;