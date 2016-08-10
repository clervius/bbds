'use strict';
var controller = require('./ath.controller')();
var express = require('express');
var router = express.Router();

router.get('/ath/all', controller.getAll);
router.get('/ath/:id', controller.getOne);

router.post('/ath/new', controller.create);
router.post('/ath/addRecord', controller.addRecord);
router.post('/ath/addGallery', controller.addGallery);
router.post('/ath/addVideo', controller.addVideo);
router.post('/ath/update/:id', controller.update);

module.exports = router;