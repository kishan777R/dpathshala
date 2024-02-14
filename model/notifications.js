var mongoose = require('mongoose');





const notificationsSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    for_all: {
        type: String,

    },
    generated_type: {
        type: String,
    },
    c_id_int: {
        type: Number,

    },
    send_after_hour:{
        type: Number,
    },
    course_id: {
        type: String,

    },
    seenbytillnow_c_id_int:{
        type:Array
    },
    sentbytillnow_c_id_int:{
        type:Array
    },
    day_number: {
        type: String,

    },
    sub_course_id: {
        type: String,

    },
    to_be_sent_on: {
        type: Date,

    },
    test_for_today_always: {
        type: Boolean,
    },
    notificationType: {
        type: String,
    },

    created_on: {
        type: Date,

    },

    created_by: {
        type: Number,

    },
    updated_on: {
        type: Date,

    }
    ,
    updated_by: {
        type: Number,

    }
    ,
    deleted_on: {
        type: Date,

    }
    ,
    deleted_by: {
        type: Number,

    },
    sent_status: {
        type: Boolean,

    }, seen_status: {
        type: Boolean,

    },
    tablestatus: {
        type: String,

    },
    link: {
        type: String,

    },
    websitelink: {
        type: String,
        default:""

    },
});

const Notifications = module.exports = mongoose.model('Notifications', notificationsSchema);