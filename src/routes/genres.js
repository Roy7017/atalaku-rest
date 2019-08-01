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
//Get genre by type
router.get('/type/:type', (req, res) =>
    Genre.findAll({
        where: {
            type: {
                [Op.like] : '%'+req.params.type+'%'
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
    let { name, type } = req.body;

    Genre.create({
        name, type
    })
    .then(genre => res.json(genre))
    .catch(err => console.log(err));
});

//Delete a genre
router.delete('/:id', (req, res) => {
    console.log(req.param.id)
    Genre.destroy({
        where: {
            id: req.param.id
        }
    })
    .then(genre => res.json(genre))
    .catch(err => console.log(err))
});


module.exports = router;