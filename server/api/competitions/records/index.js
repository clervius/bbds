var controller = require('./record.controller')();
var express = require('express');
var router = express.Router();

router.get('/record/all', controller.getAll);
router.get('/record/:id', controller.getOne);

router.post('/record/new', controller.create);
router.post('/record/update/:id', controller.update);

module.exports = router;