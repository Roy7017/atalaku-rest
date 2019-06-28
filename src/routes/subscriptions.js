const express = require('express');
const router = express.Router();
const database = require('../db');
const Op = database.Sequelize.Op;
const Subscription = require('../models/subscription');

//Get all subscriptions
router.get('/', (req, res) => 
    Subscription.findAll()
    .then(subscriptions => res.json(subscriptions))
    .catch(err => console.log(err))
);

router.get('/frequency/:frequency', (req, res) => 
    Subscription.findAll({
        where: {
            frequency: req.params.frequency
        }
    })
    .then()
);

module.exports = router;