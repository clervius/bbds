var controller = require('./federation.controller')();
var express = require('express');
var router = express.Router();

router.get('/federation/all', controller.getAll);
router.get('/federation/:id', controller.getOne);

router.post('/federation/new', controller.create);
router.post('/federation/update/:id', controller.update);
router.post('/federation/addDivision', controller.addDivision);

module.exports = router;