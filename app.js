const express = require('express');
const routes = require('./routes');
const path = require('path');
const { errorHandler, notFoundHandler } = require('./routes/errors');
const { connectDB } = require('./services/database');

const app = express();

connectDB().catch(console.error);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} 
