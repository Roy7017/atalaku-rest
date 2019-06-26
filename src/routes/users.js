const express = require('express');
const router = express.Router();
const database = require('../db');
const User = require('../models/user');

//Show all users
router.get('/', (req, res) => 
User.findAll()
.then(users => {
    res.json(users);
})
.catch((err) => console.log(err))
);

//add a user
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
    let {username, password, tel, email, country, expiryDate} = req;

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

})

module.exports = router;