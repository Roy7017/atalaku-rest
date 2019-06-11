

const db = require('../db');
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

//Importing models
const User = require('./user');
const Subscription = require('./subscription');
const Music = require('./music');
const MusicLike = require('./musicLike');
const MusicComment = require('./musicComment');
const MusicVideo = require('./musicVideo');
const MusicVideoComment = require('./musicVideoComment');
const MusicVideoLike = require('./musicVideoLike');
const BlogPost = require('./blogPost');
const BlogPostComment = require('./blogPostComment');
const BlogPostLike = require('./blogPostLike');
const Movie = require('./movie');
const MovieReview = require('./movieReview');

//CREATING ASSOCIATIONS

User.belongsTo(Subscription); // ONE TO ONE - subscriptionID goes to User model

//Many-to-many - intermediate tables are used
User.belongsToMany(Music, {through: MusicLike});
Music.belongsToMany(User, {through: MusicLike});

User.belongsToMany(Music, {through: MusicComment});
Music.belongsToMany(User, {through: MusicComment});

User.belongsToMany(MusicVideo, {through: MusicVideoLike});
MusicVideo.belongsToMany(User, {through: MusicVideoLike});

User.belongsToMany(MusicVideo, {through: MusicVideoComment});
MusicVideo.belongsToMany(User, {through: MusicVideoComment});

User.belongsToMany(Movie, {through: MovieReview});
Movie.belongsToMany(User, {through: MovieReview});

User.belongsToMany(BlogPost, {through: BlogPostLike});
BlogPost.belongsToMany(User, {through: BlogPostLike});

User.belongsToMany(BlogPost, {through: BlogPostComment});
BlogPost.belongsToMany(User, {through: BlogPostComment});

//Scripting dummy data in DB
Subscription.sync({force: true}).then(() => { //Start by creating subscription table bc of foreign key constraint in user table
    User.sync({force: true}).then(() => { //then create user table
        for (let i = 0; i < 5; i++) {
            //creating subscription instance
            let sub = Subscription.build({
                type: 'MONTHLY',
                expiryDate: new Date('2019-05-' + (1 + i)),
                plan: 'GOLD'
            });

            //Creating user instance
            let usr = User.build({
                username: 'user' + i,
                password: 'pass' + i,
                tel: 650990800 + i,
                email: 'user'+i+ '@prampi.com',
                country: 'CM'
            });

            //saving the subscription instance
            sub.save().then(() => {
                //and then saving user instance
                usr.save()
                    //and then associating the instances
                    .then(() => usr.setSubscription(sub))
            });
        }
    })
});
// User.sync({force:true}).then(() => {
//     User.create({
//         username: 'arampe',
//         password: 'prampi',
//         tel: 650990800,
//         email: 'arampe@prampi.com',
//         country: 'CM'
//     });
//     User.create({
//         username: 'arampe',
//         password: 'prampi',
//         tel: 650990800,
//         email: 'arampe@prampi.com',
//         country: 'CM'
//     });
//     User.create({
//         username: 'arampe',
//         password: 'prampi',
//         tel: 650990800,
//         email: 'arampe@prampi.com',
//         country: 'CM'
//     });
//     User.create({
//         username: 'arampe',
//         password: 'prampi',
//         tel: 650990800,
//         email: 'arampe@prampi.com',
//         country: 'CM'
//     });
// });



module.exports = sequelize;
