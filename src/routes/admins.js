const express = require('express');
const router = express.Router();
const database = require('../db');
const Op = database.Sequelize.Op;
const Admin = require('../models/admin');

//Get all admins
router.get('/', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : 0;
    req.query.limit = req.query.limit ? Number(req.query.limit) : 50;
    
    Admin.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
    })
    .then(admins => res.json(admins))
    .catch(err => console.log(err));
});

//Get admin by id
router.get('/:id', (req, res) => {
    Admin.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(admin => res.json(admin))
    .catch(err => console.log(err));
});

//Get admin by username
router.get('/username/:username', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : 0;
    req.query.limit = req.query.limit ? Number(req.query.limit) : 50;

    Admin.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
        where: {
            username: {
                [Op.like]: req.params.username
            }
        }
    })
    .then(admins => res.json(admins))
    .catch(err => console.log(err));
});

module.exports = router;