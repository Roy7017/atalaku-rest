const express = require('express');
const router = express.Router();
const database = require('../db');
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
                [Op.like] : '%'+name+'%'
            }
        }
    })
    .then(genres => res.json(genres))
    .catch(err => console.log(err))
);

//Update 

module.exports = router;