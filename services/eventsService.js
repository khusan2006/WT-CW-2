const Event = require('../models/Event');

// Service methods
exports.getAllEvents = async () => {
    return await Event.find().sort({ date: 1 });
};

exports.getEventById = async (id) => {
    return await Event.findById(id);
};

exports.createEvent = async (eventData) => {
    const event = new Event(eventData);
    await event.save();
    return event._id;
};

exports.updateEvent = async (id, eventData) => {
    await Event.findByIdAndUpdate(id, eventData, { new: true });
};

exports.deleteEvent = async (id) => {
    await Event.findByIdAndDelete(id);
}; 