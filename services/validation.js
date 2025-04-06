const { body, validationResult } = require('express-validator');

const eventValidationRules = [
    body('title')
        .trim()
        .notEmpty().withMessage('Event title is required')
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long')
        .isLength({ max: 100 }).withMessage('Title must not exceed 100 characters'),
    
    body('description')
        .trim()
        .notEmpty().withMessage('Event description is required')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long')
        .isLength({ max: 1000 }).withMessage('Description must not exceed 1000 characters'),
    
    body('date')
        .notEmpty().withMessage('Event date is required')
        .isISO8601().withMessage('Invalid date format')
        .custom((value) => {
            const eventDate = new Date(value);
            const now = new Date();
            if (eventDate < now) {
                throw new Error('Event date must be in the future');
            }
            return true;
        }),
    
    body('location')
        .trim()
        .notEmpty().withMessage('Event location is required')
        .isLength({ min: 3 }).withMessage('Location must be at least 3 characters long')
        .isLength({ max: 200 }).withMessage('Location must not exceed 200 characters')
];

const validateEvent = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // For API requests
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // For form submissions
        return res.render(`events/${req.originalUrl.includes('new') ? 'new' : 'edit'}`, {
            title: req.originalUrl.includes('new') ? 'Create New Event' : 'Edit Event',
            event: req.body,
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    eventValidationRules,
    validateEvent
}; 