var mongoose = require('mongoose');





const visitSchema = mongoose.Schema({
    c_id_int: {
        type: Number,

    },
    
    created_on: {
        type: Date,

    },
    course_id: {
        type: String,

    },

   
});

const AfVisits = module.exports = mongoose.model('AfVisits', visitSchema);