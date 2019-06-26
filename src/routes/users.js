const express = require('express');
const router = express.Router();
const database = require('../db');
const User = require('../models/user');

//Read all users
router.get('/', (req, res) => 
User.findAll()
.then(users => {
    res.json(users);
})
.catch((err) => console.log(err))
);

//Read specific users
router.get('/:id', (req, res) => 
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(user => res.json(user))
    .catch(err => console.log(err))
);

//Read users by name
router.get('/:name', (req, res) => 
    User.findAll({
        where: {
            username: {
                 [Op.like] : '%'+name+'%'
            }
        }
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
    let {username, password, tel, email, country, expiryDate} = req.body;

    //Adding info to database
    User.create({
        username,
        password,
        tel,
        email,
        country,
        expiryDate
    })
    .then(user => res.json(user)) //we give the added user back as json response
    .catch(err => console.log(err));

});

//Updating a user
router.put('/:id', (req, res) => {

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
    .catch(err => console.log(err))
});



module.exports = router;