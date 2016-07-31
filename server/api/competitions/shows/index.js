var controller = require('./show.controller')();
var express = require('express');
var router = express.Router();

router.get('/show/all', controller.getAll);
router.get('/show/:id', controller.getOne);

router.post('/show/new', controller.create);
router.post('/show/update/:id', controller.update);

module.exports = router;