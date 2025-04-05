const express = require('express');
const routes = require('./routes');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
