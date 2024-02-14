var mongoose = require('mongoose');





const AskedchatSchema = mongoose.Schema({


    referenceid: {
        type: String,

    },
    message: {
        type: String,

    },
    by: {
        type: String,

    },
    seen_by_respective: {
        type: Boolean,

    },
    date: {
        type: Date,

    },
    
    deleted_on: {
        type: Date,

    }
    ,
    deleted_by: {
        type: Number,

    },
    created_on: {
        type: Date,
        required: true
    },

    created_by: {
        type: Number,
        required: true
    },
    
    tablestatus: {
        type: String,
        required: true
    },
     
});

const Asked_Chat = module.exports = mongoose.model('Asked_Chat', AskedchatSchema);