var controller = require('./record.controller')();
var express = require('express');
var router = express.Router();

router.get('/record/all', controller.getAll);
router.get('/record/:id', controller.getOne);
router.get('/record/ath/:id', controller.getAthRecords);

router.post('/record/new', controller.create);
router.post('/record/:id/update', controller.update);

router.delete('/record/:id/delete', controller.deleteOne);

module.exports = router;