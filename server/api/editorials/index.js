var controller = require('./editorial.controller')();
var express = require('express');
var router = express.Router();

router.get('/editorial/all', controller.getAll);
router.get('/editorial/:id', controller.getOne);

router.post('/editorial/new', controller.create);
router.post('/editorial/update/:id', controller.update);

module.exports = router;