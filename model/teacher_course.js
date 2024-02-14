var mongoose = require('mongoose');
const courseSchema = mongoose.Schema({
    course_name: {
        type: String,
        required: true
    },
    parent_course: {
        type: String,

    },
    course_review_status: {
        type: String,
        required: true
    },
    course_publish_status: {
        type: String,
        default: "PENDING"
    },
    original_course_id: {
        type: String,
        default:""

    },
    rejection_reason: {
        type: String,

    },
    course_publish_rejection_reason: {
        type: String,

    },
    rating: {
        type: Number,
        default:4

    },
    adding_date: {
        type: Date,
        required: true
    },
    imagepath: {
        type: String,

    },
    yourcourse_imagepath: {
        type: String,

    },
    instructor: {
        type: String,

    },
    serverpath: {
        type: String,

    },
    backgroundimagepath: {
        type: String,
    },
    cardArr: {
        type: Array,
    },

    certificate_type: {
        type: String
    },

    amount: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,

    },
    duration_type: {
        type: String,

    },
    is_self_paced: {
        type: Boolean
    },

    describeArr: {
        type: Array

    },
    created_on: {
        type: Date,
        required: true
    }
    ,
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
    order_count_of_this_course: {
        type: Number,
        default: 0

    },
    order_amount_of_this_course: {
        type: Number,
        default: 0

    },
});

const teacher_course = module.exports = mongoose.model('teacher_course', courseSchema);