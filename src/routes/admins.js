const express = require('express');
const router = express.Router();
const database = require('../db');
const Op = database.Sequelize.Op;
const Admin = require('../models/admin');

//Get all admins
router.get('/', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;
    
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
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

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
//Create an admin
router.post('/', (req, res) => {
    let { username, email, password, phone, permissions } = req.body;

    Admin.create({
        username, email, password, phone, permissions
    })
    .then(admin => res.json(admin))
    .catch(err => console.log(err));
});
// Update an admin
router.put('/:id', (req, res) => {
    let { username, email, password, phone, permissions } = req.body;

    Admin.update({
        username, email, password, phone, permissions
    },
    {
        where : {
            id: req.params.id
        }
    })
    .then(admin => res.json(admin))
    .catch(err => {console.error(err); res.status(401).jsonp(err)});
});
// Update an admin
router.delete('/:id', (req, res) => {

    Admin.destroy({
        where : {
            id: req.params.id
        }
    })
    .then(admin => res.json(admin))
    .catch(err => {console.error(err); res.status(401).jsonp(err)});
});

router.post('/', (req, res) => {
    const {username, password, email, permissions} = req.query;

    Admin.create({
        username, 
        password,
        email,
        permissions
    })
    .then(admin => res.json(admin))
    .catch(err = console.log(err));
});

module.exports = router;