const express = require('express');
const router = express.Router();
const eventController = require('../../controllers/eventsControllers');

router.get('/', eventController.getAllEvents);

router.get('/new', eventController.getNewEventForm);

router.post('/', eventController.createEvent);

router.get('/:id', eventController.getEvent);

router.get('/:id/edit', eventController.getEditEventForm);

router.post('/:id/edit', eventController.updateEvent);

router.post('/:id/delete', eventController.deleteEvent);

module.exports = router; 