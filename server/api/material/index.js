'use strict';
var controller = require('./material.ctrl')();
var express = require('express');
var router = express.Router();

router.get('/front', controller.homePage);
router.get('/front/athletes', controller.athletes);
router.get('/front/posts', controller.posts);
router.get('/front/athlete/:id', controller.getOneAthlete);
router.get('/front/post/:id', controller.getOnePost);


module.exports = router;