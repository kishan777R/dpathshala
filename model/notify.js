var mongoose = require('mongoose');
const notifySchema = mongoose.Schema({
    
    email: {
        type: String,
    },
    sub_course_id: {
        type: String,
    },
    created_on:{
        type: Date
    },
    email_sent:{
        type: Boolean,
        default:false
    }
});

const notify = module.exports = mongoose.model('notify', notifySchema);