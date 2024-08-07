const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');

router.get('/countries', apiController.getCountries);

router.get('/countries/streaming-services/:country', apiController.getStreamingServices);

router.get('/shows/:country/:title', apiController.getShows);

module.exports = router;