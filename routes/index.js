const express = require('express');
const router = express.Router();
const eventRoutes = require('./events/index');

router.get('/', (req, res) => {
    res.render('index', { title: 'Hello world' });
});

router.use('/events', eventRoutes);
module.exports = router; 