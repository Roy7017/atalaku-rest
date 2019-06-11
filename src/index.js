const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const sequelize = require('./models/sequelize');
const models = sequelize.models;
const User = require("./models/user");

sequelize.authenticate()
    .then(() => {
        console.log("Connection established");
    })
    .catch(err => {
        console.error('Unable to connect to database', err);
    });

const app = express();
app.get('/', (req, res) => {
    User.findAll()
        .then(gigs => {
            console.log(gigs);
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,  console.log(`Server started on port ${PORT}`));

