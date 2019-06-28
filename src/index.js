const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');

const sequelize = require('./models/sequelize');
const User = require("./models/user");
const Subscription = require('./models/subscription');
const Music = require('./models/music');
const MusicLike = require('./models/musicLike');
const MusicComment = require('./models/musicComment');
const MusicVideo = require('./models/musicVideo');
const MusicVideoComment = require('./models/musicVideoComment');
const MusicVideoLike = require('./models/musicVideoLike');
const BlogPost = require('./models/blogPost');
const BlogPostComment = require('./models/blogPostComment');
const BlogPostLike = require('./models/blogPostLike');
const Movie = require('./models/movie');
const MovieReview = require('./models/movieReview');
const Genre = require('./models/genre');

sequelize.authenticate()
    .then(() => {
        console.log("Connection established");
    })
    .catch(err => {
        console.error('Unable to connect to database', err);
    });

const app = express();
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//Users route
app.use('/users', require('./routes/users'));

//Music route
app.use('/music', require('./routes/music'));

//Music videos route
app.use('/music/videos', require('./routes/musicVideos'));

//Movies route
app.use('/movies', require('./routes/movies'));

//Blog posts routes
app.use('/posts', require('./routes/blogPosts'));

//genre routes
app.use('/genres', require('./routes/genres'));

//subscriptions route
app.use('/subscriptions', require('./routes/subscriptions'));

//admins route
app.use('/admins', require('./routes/admins'));

//albums route
app.use('/albums', require('./routes/albums'));

//default route
app.get('/', (req, res) => {
    res.send('ATALAKU REST API');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT,  console.log(`Server started on port ${PORT}`));

