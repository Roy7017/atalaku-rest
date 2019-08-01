const express = require('express');
const router = express.Router();
const database = require('../db');
const Op = database.Sequelize.Op;
const Movie = require('../models/movie');
const User  = require('../models/user');
const Genre = require('../models/genre');
const Admin = require('../models/admin');

//Get all movies
router.get('/', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Movie.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
        subQuery: false,
        include: [{
            model: Genre,
        },
        {
            model: Admin,
            as: 'movieUploader',
        }]
    })
    .then(movies => res.json(movies))
    .catch(err => console.log(err))
});

//Get movies by id
router.get('/:id', (req, res) => 
    Movie.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Genre,
        },
        {
            model: Admin,
            as: 'movieUploader',
        }]        
    })
    .then(movie => res.json(movie))
    .catch(err => console.log(err))
);

//Get movies by title
router.get('/title/:title', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Movie.findAll({
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
            model: Admin,
            as: 'movieUploader',
        }]
    })
    .then(movies => res.json(movies))
    .catch(err => console.log(err))
});

//Get movies by director
router.get('/director/:director', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Movie.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
        subQuery: false,
        where: {
            director: {
                [Op.like]: '%'+req.params.director+'%'
            }
        },
        include: [{
            model: Genre,
        },
        {
            model: Admin,
            as: 'movieUploader',
        }]
    })
    .then(movies => res.json(movies))
    .catch(err => console.log(err))
});

//Get movies by producer
router.get('/producer/:producer', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Movie.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
        subQuery: false,
        where: {
            producer: {
                [Op.like]: '%'+req.params.producer+'%'
            }
        },
        include: [{
            model: Genre,
        },
        {
            model: Admin,
            as: 'movieUploader',
        }]
    })
    .then(movies => res.json(movies))
    .catch(err => console.log(err))
});

//Get movies by writer
router.get('/writer/:writer', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Movie.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
        subQuery: false,
        where: {
            writer: {
                [Op.like]: '%'+req.params.writer+'%'
            }
        },
        include: [{
            model: Genre,
        },
        {
            model: Admin,
            as: 'movieUploader',
        }]
    })
    .then(movies => res.json(movies))
    .catch(err => console.log(err))
});

//Get movies by studio
router.get('/studio/:studio', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Movie.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
        subQuery: false,
        where: {
            studio: {
                [Op.like]: '%'+req.params.studio+'%'
            }
        },
        include: [{
            model: Genre,
        },
        {
            model: Admin,
            as: 'movieUploader',
        }]
    })
    .then(movies => res.json(movies))
    .catch(err => console.log(err))
});

//Get all reviews and users
router.get('/reviews/:id', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    Movie.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: User,
            as: 'reviewUsers',
            limit: req.query.limit,
            offset: req.query.offset,
        }],
    })
    .then(movie => {
        res.json(movie.reviewUsers)
    })
    .catch(err => console.log(err));
})

//Create a movie
router.post('/', (req, res) => 
    Movie.create({
        title: req.query.title,
        description: req.query.description, 
        rating: req.query.rating,
        director: req.query.director,
        producer: req.query.producer,
        writer: req.query.writer,
        release_date: req.query.release_date,
        studio: req.query.studio,
        thumbnail_url: req.query.thumbnail_url,
        cdn_link: req.query.cdn_link,
        duration: req.query.duration
    })
    .then(movie => res.json(movie))
    .catch(err => console.log(err))
);

//Update a movie
router.put('/:id', (req, res) => 
    Movie.update({
        title: req.body.title,
        description: req.body.description, 
        rating: req.body.rating,
        director: req.body.director,
        producer: req.body.producer,
        writer: req.body.writer,
        release_date: req.body.release_date,
        studio: req.body.studio,
        thumbnail_url: req.body.thumbnail_url,
        cdn_link: req.body.cdn_link,
        duration: req.body.duration
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(movie => res.json(movie))
    .catch(err => console.log(err))
);

//Delete a movie
router.delete('/:id', (req, res) => 
    Movie.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(movie => res.json(movie))
    .catch(err => console.log(err))
);
module.exports = router;