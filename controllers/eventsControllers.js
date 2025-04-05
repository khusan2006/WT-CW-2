const eventService = require('../services/eventsService');

exports.getAllEvents = async (_, res) => {
    try {
        const events = await eventService.getAllEvents();
        res.render('events/index', { title: 'All Events', events });
    } catch (error) {
        res.status(500).render('error', { message: 'Error fetching events' });
    }
};

exports.getNewEventForm = (_, res) => {
    res.render('events/newEvent', { title: 'Create New Event' });
};

exports.createEvent = async (req, res) => {
    try {
        await eventService.createEvent(req.body);
        res.redirect('/events');
    } catch (error) {
        res.status(500).render('error', { message: 'Error creating event' });
    }
};

