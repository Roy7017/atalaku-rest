
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
const Artist = require('./artist');
const MusicArtist = require('./musicArtist');
const VideoArtist = require('./videoArtist');


//CREATING ASSOCIATIONS

User.belongsTo(Subscription); // ONE TO ONE : subscriptionId goes to User model

//ONE-TO-MANY associations
Album.hasMany(Music, { as: 'songs'});
Music.belongsTo(Album);

Album.hasMany(MusicVideo, { as: 'videos'});
MusicVideo.belongsTo(Album);

Artist.hasMany(Music, { as: 'songs'});
Music.belongsTo(Artist);

Artist.hasMany(MusicVideo, { as: 'videos'});
MusicVideo.belongsTo(Artist);

Artist.hasMany(Album, {as: 'albums'});
Album.belongsTo(Artist);

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

Music.belongsToMany(Artist, {as: 'featuredArtists', through : MusicArtist});
Artist.belongsToMany(Music, {as : 'featuredSongs', through: MusicArtist});

MusicVideo.belongsToMany(Artist, {as: 'featuredArtists', through: VideoArtist});
Artist.belongsToMany(MusicVideo, {as : 'featuredVideos', through: VideoArtist});

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
        phone: '0000',
        email: 'root@atalaku.cm',
        permissions: JSON.stringify({
            addStaff: true,
            updateStaff: true,
            deleteStaff: true,
            addMusic: true,
            updateMusic: true,
            deleteMusic: true,
            addMovies: true,
            updateMovies: true,
            deleteMovies: true,
          })
    });


    let musicGenre = Genre.build({
        name: 'Hip-Hop',
        type: 'music',
    });

    let movieGenre = Genre.build({
        name: 'Adventure',
        type: 'movie',
    });

    let mrLeo = Artist.build({
        name: 'Mr Leo'
    });

    let locko = Artist.build({
        name: 'Locko'
    });
    
    let rickRoss = Artist.build({
        name: 'Rick Ross'
    });

    await admin.save();
    await musicGenre.save();
    await movieGenre.save();
    await mrLeo.save();
    await locko.save();
    await rickRoss.save();
    
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
            expiryDate: new Date('2019-08-' + (1 + i))
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
            year: '201' + i,
            disc_num: 1
        });

        let musicVid = MusicVideo.build({
            title: 'title' + i,
            year: '201' + i,
            disc_num: 1
        });

        let album = Album.build({
            name: 'Album' + i,
            year: '201' + i,
            thumbnail_url: "http://localhost:4200/assets/images/mboko.jpeg",
        });


        await sub.save();
        await post.save();
        await movie.save();
        await music.save();
        await musicVid.save();
        await usr.save();
        await album.save();
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
                musicLikes.forEach((musicLike, j) => 
                    Music.findOne({
                        where: {
                            id: musicLike.dataValues.musicId
                        }
                    })
                    .then(music => music.increment('likes', {by: i}))
                );
            });
            usr.addMusicComment(music, {through: {comment: 'Nice song'}});
            usr.addVideoLike(musicVid)
                .then(videoLikes => {
                    videoLikes.forEach((videoLike, j) => 
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
            album.setArtist(mrLeo);

            movie.setMovieUploader(admin);
            movie.setGenre(movieGenre);

            music.setMusicUploader(admin);
            music.setGenre(musicGenre);
            music.setArtist(mrLeo);
            music.setFeaturedArtists([locko, rickRoss]);

            musicVid.setVideoUploader(admin);
            musicVid.setGenre(musicGenre);
            musicVid.setArtist(mrLeo);
            musicVid.setFeaturedArtists([locko, rickRoss]);
        //ENDSUBREGION

    }
}
//ENDREGION

module.exports = sequelize;