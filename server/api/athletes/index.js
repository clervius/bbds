'use strict';
var controller = require('./ath.controller')();
var express = require('express');
var router = express.Router();

router.get('/ath/all', controller.getAll);
router.get('/ath/:id', controller.getOne);

router.post('/ath/new', controller.create);
router.post('/ath/addRecord', controller.addRecord);
router.post('/ath/addGallery', controller.addGallery);
router.post('/ath/:id/addToAlbum/:galId', controller.addToAlbum);
router.post('/ath/:id/editAlbum/:galId', controller.updateAlbum);
router.post('/ath/:id/addVideo', controller.addVideo);
router.post('/ath/update/:id', controller.update);

router.delete('/ath/:id', controller.deleteOne);
router.post('/ath/:id/delGallery/:galId', controller.deleteGallery);
router.post('/ath/:id/deleteFromAlbum/:galId', controller.deleteFromAlbum);
router.delete('/ath/:id/deleteVideo/:videoId', controller.deleveVideo);

module.exports = router;