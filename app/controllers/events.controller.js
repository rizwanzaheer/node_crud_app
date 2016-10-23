const Event = require('../models/event');

module.exports = {
    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents
}

/**
 * show all events 
 */

function showEvents(req, res) {
    // create dummy data 
    // const events = [{
    //         name: 'Basketball',
    //         slug: 'basketball',
    //         description: 'Throwing into a basket.'
    //     },
    //     {
    //         name: 'Swimming',
    //         slug: 'swimming',
    //         description: 'Michael Phelps is the fast fish.'
    //     },
    //     {
    //         name: 'Weightlifting',
    //         slug: 'weightlifting',
    //         description: 'Lifting heavy things up.'
    //     }
    // ];

    // get all data 

    // return a view with data
    res.render('pages/events', { events: events });
}
// show a single event 
function showSingle(req, res) {
    // get a single event
    const event = {
        name: 'Basketball',
        slug: 'basketball',
        description: 'Throwing into a basket.'
    };
    res.render('pages/single', { event: event });
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