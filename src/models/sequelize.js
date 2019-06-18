
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
const Genre = require('./genre');

//CREATING ASSOCIATIONS

User.belongsTo(Subscription); // ONE TO ONE : subscriptionId goes to User model

//ONE TO ONE : genreId goes to other models
MusicVideo.belongsTo(Genre); 
Music.belongsTo(Genre);
Movie.belongsTo(Genre);

//Many-to-many : intermediate tables are used
User.belongsToMany(Music, {through: MusicLike, as: {singular: 'musicLike', plural: 'musicLikes'}});
Music.belongsToMany(User, {through: MusicLike, as: {singular: 'musicLikeUser', plural: 'musicLikeUsers'}});

User.belongsToMany(Music, {through: MusicComment, as: {singular: 'musicComment', plural: 'musicComments'}});
Music.belongsToMany(User, {through: MusicComment, as: {singular: 'musicCommentUser', plural: 'musicCommentUsers'}});

User.belongsToMany(MusicVideo, {through: MusicVideoLike, as: {singular: 'videoLike', plural: 'videoLikes'}});
MusicVideo.belongsToMany(User, {through: MusicVideoLike, as: {singular: 'videoLikeUser', plural: 'videoLikeUsers'}});

User.belongsToMany(MusicVideo, {through: MusicVideoComment, as: {singular: 'videoComment', plural: 'videoComments'}});
MusicVideo.belongsToMany(User, {through: MusicVideoComment, as: {singular: 'videoCommentUser', plural: 'videoCommentUsers'}});

User.belongsToMany(Movie, {through: MovieReview, as: {singular: 'movieReview', plural: 'movieReviews'}});
Movie.belongsToMany(User, {through: MovieReview, as: {singular: 'reviewUser', plural: 'reviewUsers'}});

User.belongsToMany(BlogPost, {through: BlogPostLike, as: {singular: 'blogPostLike', plural: 'blogPostLikes'}});
BlogPost.belongsToMany(User, {through: BlogPostLike, as: {singular: 'blogLikeUser', plural: 'blogLikeUsers'}});

User.belongsToMany(BlogPost, {through: BlogPostComment, as: {singular: 'blogPostComment', plural: 'blogPostComments'}});
BlogPost.belongsToMany(User, {through: BlogPostComment, as: {singular: 'blogCommentUser', plural: 'blogCommentUsers'}});

//REGION: Creating tables
async: Genre.sync();
async:  Music.sync();
async:  MusicVideo.sync();
async:  BlogPost.sync();
async:  Movie.sync();
async:  Subscription.sync();
async:  User.sync();
async:  MusicLike.sync();
async:  MusicComment.sync();
async:  MusicVideoLike.sync();
async:  MusicVideoComment.sync();
async:  BlogPostLike.sync();
async:  BlogPostComment.sync();
async:  MovieReview.sync();
//ENDREGION


//REGION: Creation dummy data and saving
//Comment or modify this region to either not save or change saved data
//Tip comment after first run to stop additional redundant data from entering database
for (let i = 0; i < 5; i++) {

    //creating subscription instance
    let sub = Subscription.build({
        frequency: 'MONTHLY',
        plan: 'GOLD',
        amount: 3000
    });

    //Creating user instance
    let usr = User.build({
        username: 'user' + i,
        password: 'pass' + i,
        tel: 650990800 + i,
        email: 'user' + i + '@prampi.com',
        country: 'CM',
        expiryDate: new Date('2019-05-' + (1 + i))
    });

    let movie = Movie.build({
        title: 'Movie N0.' + i,
        description: 'A nice movie',
        rating: 'PG-13',
        producer: "Mutia"
    });

    let post = BlogPost.build({
        title: 'A world begins No.' + i,
        author: 'Hubert Formin',
        text: 'I had nothing to write'
    });

    let music = Music.build({
        title: 'title' + i,
        artist: 'artist' + i,
        album: 'album' + i,
        year: '201' + i,
        disc_num: 1
    });

    let musicVid = MusicVideo.build({
        title: 'title' + i,
        artist: 'artist' + i,
        album: 'album' + i,
        year: '201' + i,
        disc_num: 1
    });

    async: sub.save();
    async: post.save();
    async: movie.save();
    async: music.save();
    async: musicVid.save();
    async: usr.save();

    //SUBREGION: Creation associations between instancees in database
    async: () => {
        usr.setSubscription(sub);
        usr.addMovieReview(movie, { 
            through: {
                comment: 'nice movie',
                rating: i
            }
        });
        usr.addBlogPostLike(post);
        usr.addBlogPostComment(post, {through: {commment: 'nice'}});
        usr.addMusicLike(music);
        usr.addMusicComment(music, {through: {comment: 'Nice song'}});
        usr.addVideoLike(musicVid);
        usr.addVideoComment(musicVid, {through: {comment: 'Nice vid'}});
    }
    //ENDSUBREGION

}
//ENDREGION

module.exports = sequelize;