var mongoose = require('mongoose');





const topicSchema = mongoose.Schema({



    sub_course_id: {
        type: String,
        required: true
    },

    topic_name: {
        type: String,
        required: true
    },
    original_topic_id: {
        type: String,

    },
    adding_date: {
        type: Date,
        required: true
    },

    created_on: {
        type: Date,
        required: true
    },

    created_by: {
        type: Number,
        required: true
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
        required: true
    },

});

const teacher_topics = module.exports = mongoose.model('teacher_Topics', topicSchema);