
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
const Admin = require('./admin');
const Album = require('./album');
const Documentary = require('./documentary');


//CREATING ASSOCIATIONS

User.belongsTo(Subscription); // ONE TO ONE : subscriptionId goes to User model

//ONE-TO-MANY associations
Album.hasMany(Music, { as: 'songs'});
Album.hasMany(MusicVideo, { as: 'videos'});

//ONE TO ONE associations
MusicVideo.belongsTo(Genre);
MusicVideo.belongsTo(Admin, { as: 'videoUploader'})

Music.belongsTo(Genre);
Music.belongsTo(Admin, { as: 'musicUploader'});

Movie.belongsTo(Genre);
Movie.belongsTo(Admin, { as: 'movieUploader'});

Documentary.belongsTo(Admin, { as: 'documentaryUploader'});


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


sequelize.sync({force: true}).then(() => {
    initialize();
}); 
//Creates all the tables in database
//Comment the initialize method to avoid generating additional data


//REGION: Creation dummy data and saving
const initialize = async function() {

    let admin = Admin.build({
        username: 'root',
        password: 'root',
    });

    let album = Album.build({
        name: 'FIRE'
    });

    await admin.save();
    await album.save();
    
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


        await sub.save();
        await post.save();
        await movie.save();
        await music.save();
        await musicVid.save();
        await usr.save();
        //we wait for all the instances to save first
        //await forces the promises to finish executing first
        

        //SUBREGION: Creation associations between instancees in database
            usr.setSubscription(sub);
            usr.addMovieReview(movie, { 
                through: {
                    comment: 'nice movie',
                    rating: i
                }
            });
            usr.addBlogPostLike(post);
            usr.addBlogPostComment(post, {through: {commment: 'nice'}});
            usr.addMusicLike(music).then(musicLikes => {
                musicLikes.forEach((musicLike, i) => 
                    Music.findOne({
                        where: {
                            id: musicLike.dataValues.musicId
                        }
                    })
                    .then(music => music.increment('likes', {by: 1}))
                );
            });
            usr.addMusicComment(music, {through: {comment: 'Nice song'}});
            usr.addVideoLike(musicVid)
                .then(videoLikes => {
                    videoLikes.forEach((videoLike, i) => 
                        MusicVideo.findOne({
                            where: {
                                id: videoLike.dataValues.musicVideoId
                            }
                        })
                        .then(musicVideo => musicVideo.increment('likes', {by: 1}))
                        .catch(err => console.log(err))
                    );
                });
            usr.addVideoComment(musicVid, {through: {comment: 'Nice vid'}});

            album.addSong(music);
            album.addVideo(musicVid);

            movie.setMovieUploader(admin);
            music.setMusicUploader(admin);
            musicVid.setVideoUploader(admin);
        //ENDSUBREGION

    }
}
//ENDREGION

module.exports = sequelize;