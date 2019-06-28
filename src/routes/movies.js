const express = require('express');
const router = express.Router();
const database = require('../db');
const Op = database.Sequelize.Op;
const Movie = require('../models/movie');

//Get all movies
router.get('/', (req, res) => 
    Movie.findAll()
    .then(movies => res.json(movies))
    .catch(err => console.log(err))
);

//Get movies by id
router.get('/:id', (req, res) => 
    Movie.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(movie => res.json(movie))
    .catch(err => console.log(err))
);

//Get movies by title
router.get('/title/:title', (req, res) => 
    Movie.findAll({
        where: {
            title: {
                [Op.like]: '%'+req.params.title+'%'
            }
        }
    })
    .then(movies => res.json(movies))
    .catch(err => console.log(err))
);

//Get movies by director
router.get('/director/:director', (req, res) => 
    Movie.findAll({
        where: {
            director: {
                [Op.like]: '%'+req.params.director+'%'
            }
        }
    })
    .then(movies => res.json(movies))
    .catch(err => console.log(err))
);

//Get movies by producer
router.get('/producer/:producer', (req, res) => 
    Movie.findAll({
        where: {
            producer: {
                [Op.like]: '%'+req.params.producer+'%'
            }
        }
    })
    .then(movies => res.json(movies))
    .catch(err => console.log(err))
);

//Get movies by writer
router.get('/writer/:writer', (req, res) => 
    Movie.findAll({
        where: {
            writer: {
                [Op.like]: '%'+req.params.writer+'%'
            }
        }
    })
    .then(movies => res.json(movies))
    .catch(err => console.log(err))
);

//Get movies by studio
router.get('/studio/:studio', (req, res) => 
    Movie.findAll({
        where: {
            studio: {
                [Op.like]: '%'+req.params.studio+'%'
            }
        }
    })
    .then(movies => res.json(movies))
    .catch(err => console.log(err))
);

//Create a movie
router.post('/', (req, res) => 
    Movie.create({
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