const express = require('express');
const router = express.Router();
const database = require('../db');
const Op = database.Sequelize.Op;
const Album = require('../models/album');
const Music = require('../models/music');
const MusicVideo = require('../models/musicVideo');
const Artist = require('../models/artist');

//Get all albums
router.get('/', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Album.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
    })
    .then(albums => res.json(albums))
    .catch(err => console.log(err));
});

//Get album by id
router.get('/:id', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Album.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Music,
            as: 'songs',
            limit: req.query.limit,
            offset: req.query.offset,
        },
        {
            model: MusicVideo,
            as: 'videos',
            limit: req.query.limit,
            offset: req.query.offset,
        }]
    })
    .then(album => res.json(album))
    .catch(err => console.log(err));
});

//Get album by name
router.get('/name/:name', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Album.findAll({
        where: {
            name: {
                [Op.like] : '%'+req.params.name+'%'
            }
        },
        include: [{
            model: Music,
            as: 'songs',
            limit: req.query.limit,
            offset: req.query.offset,
        },
        {
            model: MusicVideo,
            as: 'videos',
            limit: req.query.limit,
            offset: req.query.offset,
        }]
    })
    .then(albums => res.json(albums))
    .catch(err => console.log(err));
});

//Get album by artist
router.get('/artist/:artist', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Artist.findAll({
        where: {
            name: {
                [Op.like] : '%'+req.params.artist+'%'
            }
        },
        include: [{
            model: Album,
            as: 'albums',
            include: [{
                model: Music,
                as: 'songs',
                limit: req.query.limit,
                offset: req.query.offset,
            },
            {
                model: MusicVideo,
                as: 'videos',
                limit: req.query.limit,
                offset: req.query.offset,
            }]
        }]
    })
    .then(artists => res.json(artists))
    .catch(err => console.log(err));
});

//Get album by year
router.get('/year/:year', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Album.findAll({
        where: {
            year: {
                [Op.like] : '%'+req.params.year+'%'
            }
        },
        include: [{
            model: Music,
            as: 'songs',
            limit: req.query.limit,
            offset: req.query.offset,
        },
        {
            model: MusicVideo,
            as: 'videos',
            limit: req.query.limit,
            offset: req.query.offset,
        }]
    })
    .then(albums => res.json(albums))
    .catch(err => console.log(err));
});

module.exports = router;