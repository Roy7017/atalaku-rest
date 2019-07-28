const express = require('express');
const router = express.Router();
const database = require('../db');
const Op = database.Sequelize.Op;
const BlogPost = require('../models/blogPost');
const User = require('../models/user');

//Get all posts
router.get('/', (req, res) => {
    req.query.limit = req.query.limit? Number(req.query.limit) : database.DEFAULT_LIMIT;
    req.query.offset = req.query.offset? Number(req.query.offset) : database.DEFAULT_OFFSET;

    BlogPost.findAll({
        offset: req.query.offset,
        limit: req.query.limit,
    })
    .then(posts => res.json(posts))
    .catch(err => console.log(err));

});

//Get posts by id
router.get('/:id', (req, res) => {
    BlogPost.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(post => res.json(post))
    .catch(err => console.log(err));
});

//Get posts by title
router.get('/title/:title', (req, res) => {
    req.query.limit = req.query.limit? Number(req.query.limit) : database.DEFAULT_LIMIT;
    req.query.offset = req.query.offset? Number(req.query.offset) : database.DEFAULT_OFFSET;

    BlogPost.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
        where: {
            title: {
                [Op.like]: '%'+req.params.title+'%'
            }
        }
    })
    .then(posts => res.json(posts))
    .catch(err => console.log(err));
});

//Get posts by author
router.get('/author/:author', (req, res) => {
    req.query.limit = req.query.limit? Number(req.query.limit) : database.DEFAULT_LIMIT;
    req.query.offset = req.query.offset? Number(req.query.offset) : database.DEFAULT_OFFSET;

    BlogPost.findAll({
        offset: req.query.offset,
        limit: req.query.limit,
        where: {
            author: {
                [Op.like] : '%'+req.params.author+'%'
            }
        }
    })
    .then(posts  => res.json(posts))
    .catch(err => console.log(err));
});

//Get all comments and users for a post 
router.get('/comments/:id', (req, res) => {
    req.query.limit = req.query.limit? Number(req.query.limit) : database.DEFAULT_LIMIT;
    req.query.offset = req.query.offset? Number(req.query.offset) : database.DEFAULT_OFFSET;

    BlogPost.findOne({
        offset: req.query.offset,
        limit: req.query.limit,
        where: {
            id: req.params.id
        },
        include: [{
            model: User,
            as: 'blogCommentUsers',
        }],
    })
    .then(post => {
        const users = post.blogCommentUsers;
        res.json(users);
    })
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    const {title, author, thumbnail_url, text} = req.query;

    BlogPost.create({
        title, 
        author,
        thumbnail_url,
        text
    })
    .then(blogPost => res.json(blogPost))
    .catch(err => console.log(err));
});

module.exports = router;