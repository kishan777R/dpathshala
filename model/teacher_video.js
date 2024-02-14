var mongoose = require('mongoose');





const videoSchema = mongoose.Schema({
    title: {
        type: String,

    },
    details: {
        type: String,

    },
    original_video_id: {
        type: String,

    },
    order_number: {
        type: Number

    },
    video_review_status: {
        type: String

    },
    rejection_reason: {
        type: String
    },
    course_id: {
        type: String,

    },
    sub_course_id: {
        type: String,

    },
    topic_id: {
        type: String,

    },
    topic_name: {
        type: String,

    },
    adding_date: {
        type: Date,

    },
    videopath: {
        type: String,

    },
    pdfpath: {
        type: String,

    },
    supportpath: {
        type: String,

    },
    supportfiletype: {
        type: String,

    },
    videoduration: {
        type: String

    },
    videodurationHMS: {
        type: String

    },

    imagepath: {
        type: String,

    },
    serverpath: {
        type: String,

    },
    active_status: {
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
    tablestatus: {
        type: String,

    },

});

const teacher_videos = module.exports = mongoose.model('teacher_Videos', videoSchema);