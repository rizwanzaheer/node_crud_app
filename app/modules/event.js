const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// create a Schema
const eventSchema = new Schema({
    name: string,
    slug: {
        type: string,
        unique: true
    },
    description: string
});


// create the model
const eventModel = mongoose.model('Event', eventSchema);


// export the model

module.exports = eventModel;