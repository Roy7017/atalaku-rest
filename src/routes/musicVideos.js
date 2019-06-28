const express = require('express');
const router = express.Router();
const database = require('../db');
const Op = database.Sequelize.Op;
const MusicVideo = require('../models/musicVideo');

//Get all music videos
router.get('/', (req, res) => 
    MusicVideo.findAll()
    .then(videos => res.json(videos))
    .catch(err => console.log(err))
);

//Get music video by id
router.get('/:id', (req, res) => 
    MusicVideo.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(video => res.json(video))
    .catch(err => console.log(err))
);

// Get music video by title 
router.get('/title/:title', (req, res) => 
    MusicVideo.findAll({
        where: {
            title: {
                [Op.like]: '%'+req.params.title+'%'
            }
        }
    })
    .then(videos => res.json(videos))
    .catch(err => console.log(err))
);

// Get music video by artist
router.get('/artist/:artist', (req, res) => 
    MusicVideo.findAll({
        where: {
            artist: '%'+req.params.artist+'%'
        }
    })
    .then(videos => res.json(videos))
    .catch(err => console.log(err))
);

// Get music video by year
router.get('/year/:year', (req, res) => 
    MusicVideo.findAll({
        where: {
            year: req.params.year
        }
    })
    .then(videos => res.json(videos))
    .catch(err => console.log(err))
);

//Create a music video
router.post('/', (req, res) => {

    MusicVideo.create({
        title: req.body.title,
        artist: req.body.artist,
        year: req.body.year,
        disc_num: req.body.disc_num,
        composer: req.body.composer,
        album_artist: req.body.album_artist,
        duration: req.body.duration,
        cdn_link: req.body.cdn_link,
        thumbnail_url: req.body.thumbnail_url
    })
    .then(video => res.json(video))
    .catch(err => console.log(err));

});

//Update a music video
router.put('/:id', (req, res) => {
    MusicVideo.update({
        title: req.body.title,
        artist: req.body.artist,
        year: req.body.year,
        disc_num: req.body.disc_num,
        composer: req.body.composer,
        album_artist: req.body.album_artist,
        duration: req.body.duration,
        cdn_link: req.body.cdn_link,
        thumbnail_url: req.body.thumbnail_url
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(video => res.json(video))
    .catch(err => console.log(err));
});

//Delete a music video
router.delete('/:id', (req, res) => 
    MusicVideo.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(video => res.json(video))
    .catch(err => console.log(err))
);

module.exports = router;