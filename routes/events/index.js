const express = require('express');
const router = express.Router();
const eventController = require('../../controllers/eventsControllers');
const { eventValidationRules, validateEvent } = require('../../services/validation');

router.get('/', eventController.getAllEvents);

router.get('/new', eventController.getNewEventForm);
router.post('/', eventValidationRules, validateEvent, eventController.createEvent);

router.get('/:id', eventController.getEvent);

router.get('/:id/edit', eventController.getEditEventForm);
router.post('/:id/edit', eventValidationRules, validateEvent, eventController.updateEvent);

router.post('/:id/delete', eventController.deleteEvent);

module.exports = router; 