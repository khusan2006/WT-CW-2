const express = require('express');
const router = express.Router();
const eventController = require('../../controllers/eventsControllers');

router.get('/', eventController.getAllEvents);

router.get('/new', eventController.getNewEventForm);

router.post('/', eventController.createEvent);


module.exports = router; 