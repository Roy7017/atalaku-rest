const express = require('express');
const router = express.Router();
const database = require('../db');
const Op = database.Sequelize.Op;
const User = require('../models/user');
const Subscription = require('../models/subscription');

const checkExpiry = (User) => {
    expiryDate = new Date(User.expiryDate);
    //currentDate = today.
    const today = new Date();
    if(today > expiryDate){
        console.log('Expired');
        return true;
    }else{
        console.log('not expired');
        return false;
    }
};  

//Read all users
router.get('/', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    User.findAll({
        offset: req.query.offset,
        limit: req.query.limit,
        subQuery: false,
        include: [{
            model: Subscription
        }]
    })
    .then(users => {
        res.json(users);
    })
    .catch((err) => console.log(err))
});

//Read specific users
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Subscription,
        }]
    })
    .then(user => {
        user.dataValues.expired = checkExpiry(user);
        res.json(user);
    })
    .catch(err => console.log(err))
});

//Read users by name
router.get('/name/:name', (req, res) => {
    req.query.offset = req.query.offset ? Number(req.query.offset) : database.DEFAULT_OFFSET;
    req.query.limit = req.query.limit ? Number(req.query.limit) : database.DEFAULT_LIMIT;

    User.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
        subQuery: false,
        where: {
            username: {
                 [Op.like] : '%'+req.params.name+'%'
            }
        },
        include: [{
            model: Subscription,
        }]
    })
    .then(users => res.json(users))
    .catch(err => console.log(err))
});

//Read users by email
router.get('/email/:email', (req, res) => 
    User.findOne({
        where: {
            email: req.params.email
        },
        include: [{
            model: Subscription
        }]
    })
    .then(users => res.json(users))
    .catch(err => console.log(err))
);

//Create a user
router.post('/', (req, res) => {
    //Some hard-coded data for a test
    const user = {
        username: 'test',
        password: 'password',
        tel: 678373652,
        email: 'mutia@prampi.com',
        country: 'UK',
        expiryDate: new Date('2014-03-02')
    }

    //Getting user-specific attrinbutes, we'l have to add some server-side validation
    const {username, password, tel, email, country, expiryDate, subscription} = req.query;

    //Adding info to database
    User.create({
        username,
        password,
        tel,
        email,
        country,
        expiryDate
    })
    .then(async function(user){
        subcription = await Subscription.findOne({
            where: {plan: subscription}
        });
        user.setSubcription(subscription);
        res.json(user);
    }) //we give the added user back as json response
    .catch(err => console.log(err));

});

//Updating a user
router.put('/:id', (req, res) => {
    console.log('I am about to update this mother....');

    // Extracting user variables from request
    let {username, password, tel, email, country, expiryDate} = req.body;

    User.update({
        username,
        password,
        tel,    
        email,
        country, 
        expiryDate
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then((count, users) => {
        console.log(count+' number of users updated');
        res.json(users);
    })
    .catch(err => console.log(err));
});

//Delete a user
router.delete('/:id', (req, res) => 
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(user => res.json(user))
    .catch(err => console.log(err))
);


module.exports = router;