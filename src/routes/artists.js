const express = require('express');
const router = express.Router();
const database = require('../db');
const Op = database.Sequelize.Op;
const Artist = require('../models/artist');
const Music = require('../models/music');
const MusicVideo = require('../models/musicVideo');

