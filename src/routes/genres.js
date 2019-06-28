const express = require('express');
const router = express.Router();
const database = require('../db');
const Op = database.Sequelize.Op;
const Genre = require('../models/genre');

//All Genres
router.get('/', (req, res) => 
    Genre.findAll()
    .then(genres => res.json(genres))
    .catch(err => console.log(err))
);

//Get genre by name
router.get('/:name', (req, res) =>
    Genre.findAll({
        where: {
            name: {
                [Op.like] : '%'+req.params.name+'%'
            }
        }
    })
    .then(genres => res.json(genres))
    .catch(err => console.log(err))
);

//Update a genre
router.put('/:id', (req, res) => {

    let { name } = req.body;

    Genre.update({
        name
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(genre => res.json(genre))
    .catch(err => console.log(err));
});

//Create a genre
router.post('/', (req, res) => {
    let { name } = req.body;

    Genre.create({
        name
    })
    .then(genre => res.json(genre))
    .catch(err => console.log(err));
});

//Delete a genre
router.delete('/:id', (req, res) => 
    Genre.destroy({
        where: {
            id: req.param.id
        }
    })
    .then(genre => res.json(genre))
    .catch(err => console.log(err))
);


module.exports = router;