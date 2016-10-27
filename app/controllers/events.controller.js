const Event = require('../models/event');

module.exports = {
    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents,
    showCreate: showCreate,
    processCreate: processCreate,
    showEdit: showEdit,
    processEdit: processEdit,
    deleteEvent: deleteEvent
}

/**
 * show all events 
 */

function showEvents(req, res) {
    // get all data 

    // Using mongoos model
    Event.find({}, (err, events) => {
        if (err) {
            res.status(404);
            res.send("Event not found!");
        }
        // return a view with data
        res.render('pages/events', {
            events: events,
            success: req.flash('success')
        });
    });

}
// show a single event 
function showSingle(req, res) {

    // get a single event
    // Using mongoos model

    Event.findOne({ slug: req.params.slug }, (err, event) => {
        if (err) {
            res.status(404);
            res.send("Event not found...!");
        }
        // return a view with data
        res.render('pages/single', {
            event: event,
            success: req.flash('success')
        });

    });
}

/**
 * Seed the Database
 */
function seedEvents(req, res) {
    // create  some event
    const events = [
        { name: 'Basketball', description: 'Throwing into a basket.' },
        { name: 'Swimming', description: 'Michael Phelps is the fast fish.' },
        { name: 'Weightlifting', description: 'Lifting heavy things up.' },
        { name: 'ping pong', description: 'super fast paddles.' }
    ];

    // use the event model to insert/save
    Event.remove({}, () => {
        for (event of events) {
            var newEvent = new Event(event);
            newEvent.save();
        }
    });

    // seeded!
    res.send('Database seeded!');

}


// show the create form
function showCreate(req, res) {
    res.render('pages/create', {
        errors: req.flash('errors')
    });
}

// process the creation form

function processCreate(req, res) {
    // validate information
    // checkBody use to validate through bodyparser &
    // checkParams use to validate through URL

    req.checkBody('name', 'Name is required!').notEmpty();
    req.checkBody('description', 'Description is also required!').notEmpty();

    // if there are errors, redirect & save errors to flash data
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors.map(err => err.msg));
        res.redirect('/events/create');
    }


    // create a new event
    const event = new Event({
        name: req.body.name,
        description: req.body.description
    });

    // save the event
    event.save((err) => {
        if (err)
            throw err;

        // set a successful flash message
        req.flash('success', 'Successfuly created an Event!');


        // redirect to the newly created event
        res.redirect(`/events/${event.slug}`);
    });
}

/// show the edit form
function showEdit(req, res) {
    Event.findOne({ slug: req.params.slug }, (err, event) => {
        res.render('pages/edit', {
            event: event,
            errors: req.flash('errors')
        });
    });
}

//
function processEdit(req, res) {
    // validate information
    // checkBody use to validate through bodyparser &
    // checkParams use to validate through URL

    req.checkBody('name', 'Name is required!').notEmpty();
    req.checkBody('description', 'Description is also required!').notEmpty();

    // if there are errors, redirect & save errors to flash data
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors.map(err => err.msg));
        res.redirect(`/events/${req.params.slug}/edit`);
    }

    // finding a current event
    Event.findOne({ slug: req.params.slug }, (err, event) => {
        // updating that event
        event.name = req.body.name;
        event.description = req.body.description;
        event.save((err) => {
            if (err)
                throw err;

            req.flash('success', 'Successfuly updated event.');
            res.redirect('/events');
        });
        // success flash message

        // redirect back to the /events

    });
}


// deleting Event
function deleteEvent(req, res) {
    Event.remove({
        slug: req.params.slug
    }, (err) => {
        // set flash data 
        // redirect back to /events/pages
        req.flash('success', 'Event Deleted Successfuly!');
        res.redirect('/events');
    });

}