// load environment variables
require('dotenv').config();

// grab our dependencies 
const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose');

// configure our application
// tell express where to look for static assets
app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);


// set ejs  as our templating engine
app.set('view engine', 'ejs');

// connect to our database
mongoose.connect(process.env.DB_URI);


// set our routers
app.use(require('./app/routes'));

// start our server
app.listen(port, () => {
    console.log(`App listening on http://localhost:${ port }`);
});