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

//Get subscriptions by id
router.get('/:id', (req, res) => 
    Subscription.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(subscription => res.json(subscription))
    .catch(err => console.log(er))
);

//Get subscriptions by frequency
router.get('/frequency/:frequency', (req, res) => 
    Subscription.findAll({
        where: {
            frequency: req.params.frequency
        }
    })
    .then(subscriptions => res.json(subscriptions))
    .catch(err => console.log(err))
);

//Get subscriptions by plan ( name )
router.get('/name/:name', (req, res) => 
    Subscription.findAll({
        where: {
            plan: req.params.name
        }
    })
    .then(subscriptions => res.json(subscriptions))
    .catch(err => console.log(err))
);

router.post('/', (req, res) => {
    const {frequency, plan, amount} = req.query;

    Subscription.create({
        frequency,
        plan,
        amount
    })
    .then(subscription => res.json(subscription))
    .catch(err => console.log(err));
});

module.exports = router;