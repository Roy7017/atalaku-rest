const express = require('express');
const router = express.Router();
const database = require('../db');
const Op = database.Sequelize.Op;
const Music = require('../models/music');
const User = require('../models/user');
const Genre = require('../models/genre');
const Album = require('../models/album');
const Admin = require('../models/admin');
const Artist = require('../models/artist');

//Get all music 
router.get('/', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    req.query.sortColumn = req.query.sortColumn ? req.query.sortColumn : database.DEFAULT_SORT_COLUMN;
    req.query.sortDirection = req.query.sortDirection ? req.query.sortDirection : database.DEFAULT_SORT_DIRECTION;

    Music.findAll({ 
        limit: req.query.limit,
        offset: req.query.offset,
        order: [
            [req.query.sortColumn, req.query.sortDirection],
        ],
        subQuery:false,
        include: [{
            model: Genre,
        },
        {
            model: Album,
        },
        {
            model: Admin,
            as: 'musicUploader',
        }]
    })
    .then(music => {
        res.json(music);
    })
    .catch(err => console.log(err))
});

//Get music by id
router.get('/:id', (req, res) => 
    Music.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Genre,
        },
        {
            model: Album,
        },
        {
            model: Admin,
            as: 'musicUploader',
        }]
    })
    .then(music => res.json(music))
    .catch(err => console.log(err))
);

// Get music by title 
//TODO: Add sorting columns and type to query
router.get('/title/:title', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Music.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
        subQuery: false,
        where: {
            title: {
                [Op.like]: '%'+req.params.title+'%'
            }
        },
        include: [{
            model: Genre,
        },
        {
            model: Album,
        },
        {
            model: Admin,
            as: 'musicUploader',
        }]
    })
    .then(music => res.json(music))
    .catch(err => console.log(err))
});

// Get music by artist
////TODO: Add sorting columns and type to query
router.get('/artist/:artist', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Artist.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
        subQuery: false,
        where: {
            name: {
                [Op.like]: '%'+req.params.artist+'%'
            }
        },
        include: [{
            model: Music,
            as: 'songs',
            include: [{
                model: Genre,
            },
            {
                model: Album,
            },
            {
                model: Admin,
                as: 'musicUploader',
            }]
        }]
    })
    .then(artists => res.json(artists))
    .catch(err => console.log(err))
});

// Get music by year{
//TODO: Add sorting columns and type to query
router.get('/year/:year', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Music.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
        subQuery: false,
        where: {
            year: req.params.year
        },
        include: [{
            model: Genre,
        },
        {
            model: Album,
        },
        {
            model: Admin,
            as: 'musicUploader',
        }]
    })
    .then(music => res.json(music))
    .catch(err => console.log(err))
});

//Get all users and their comments for a song
router.get('/comments/:id', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Music.findOne({
        limit: req.query.limit,
        offset: req.query.offset,
        where: {
            id: req.params.id
        },
        include: [{
            model: User,
            as: 'musicCommentUsers',
            
        }],
    })
    .then(music => {
        const users = music.musicCommentUsers;
        console.log(users);
        res.json(users);
    })
    .catch(err => console.log(err));
});


//Create a song
router.post('/', (req, res) => {

    genre = req.query.genre;
    artist = req.query.artist;
    album = req.query.album;
    album_year = req.query.album_year;
    album_thumbnail_url = req.query.album_thumbnail_url;
    admin = req.query.admin;
    console.log(album_year);
    console.log(album_thumbnail_url);

    Music.create({
        title: req.query.title,
        year: req.query.year,
        likes: 0,
        disc_num: req.query.disc_num,
        composer: req.query.composer,
        duration: req.query.duration,
        cdn_link: req.query.cdn_link,
        thumbnail_url: req.query.thumbnail_url
    })
    .then(async function(music){
        [genre, created] = await Genre.findOrCreate({
            where: {name: genre},
            defaults: {name: genre, type: 'Music'}
        });
        [artist, created] = await Artist.findOrCreate({
            where: {name: artist},
            defaults: {name: artist}
        });
        [album, created] = await Album.findOrCreate({
            where: {name: album},
            defaults: {name: album, year: album_year, thumbnail_url: album_thumbnail_url}
        });
        musicUploader = await Admin.findOne({where: {username: admin}});
        //TODO: Add code for featured artists
        music.setGenre(genre);
        music.setArtist(artist);
        album.addSong(music);
        music.setMusicUploader(musicUploader);
        res.json(music);
    })
    .catch(err => console.log(err));

});

//Update a song
router.put('/:id', (req, res) => {
    Music.update({
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
    .then(music => res.json(music))
    .catch(err => console.log(err));
});

//Delete a song
router.delete('/:id', (req, res) => 
    Music.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(music => res.json(music))
    .catch(err => console.log(err))
);

module.exports = router;