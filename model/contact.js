var mongoose = require('mongoose');
const contactSchema = mongoose.Schema({
    first_name: {
        type: String,

    },
    last_name: {
        type: String,

    },
    created_on: {
        type: Date,

    },
    subject: {
        type: String,

    },
    message: {
        type: String,

    },
    mobile: {
        type: Number,

    },
    email: {
        type: String,

    },
    alreadycustomer: {
        type: Boolean,
    },
    tablestatus:{
        type: String,
    }
});

const contact = module.exports = mongoose.model('contact', contactSchema);