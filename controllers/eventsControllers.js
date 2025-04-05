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

exports.getEvent = async (req, res) => {
    try {
        const event = await eventService.getEventById(req.params.id);
        if (!event) {
            return res.status(404).render('error', { message: 'Event not found' });
        }
        res.render('events/event', { title: event.title, event });
    } catch (error) {
        res.status(500).render('error', { message: 'Error fetching event' });
    }
};

exports.getEditEventForm = async (req, res) => {
    try {
        const event = await eventService.getEventById(req.params.id);
        if (!event) {
            return res.status(404).render('error', { message: 'Event not found' });
        }
        res.render('events/editEvent', { title: 'Edit Event', event });
    } catch (error) {
        res.status(500).render('error', { message: 'Error fetching event' });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        await eventService.updateEvent(req.params.id, req.body);
        res.redirect('/events/' + req.params.id);
    } catch (error) {
        res.status(500).render('error', { message: 'Error updating event' });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        await eventService.deleteEvent(req.params.id);
        res.redirect('/events');
    } catch (error) {
        res.status(500).render('error', { message: 'Error deleting event' });
    }
}; 