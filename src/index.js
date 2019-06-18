const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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
app.get('/', (req, res) => {
    User.findAll()
        .then(users => {
            console.log(users);
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,  console.log(`Server started on port ${PORT}`));

