// create a new express router

const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller'),
    eventsController = require('./controllers/events.controller');

// export Router
module.exports = router;

// define routes
// main routes
router.get('/', mainController.showHome);

// event router
router.get('/events', eventsController.showEvents);
router.get('/events/:slug', eventsController.showSingle);
// router.get('/events/:slug', eventsController.showSingle);

// create events
// edit events
// delete events