var mongoose = require('mongoose');
const submitted_answerSchema = mongoose.Schema({
    c_id: {
        type: String,
        required: true
    },

    course_id: {
        type: String,
        required: true
    },
    sub_course_id: {
        type: String,
        required: true
    },
    exam_date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    day_number: {
        type: Number,
    },
    test_level: {
        type: Number,
        required: true
    },
    halfsubmittedStage: {
        type: String,
        default: "QUESTIONS"
    },
    submitted_passageArray: {
        type: Array
    },
    passage_submitted: {
        type: Boolean
    }, passage_reviewed: {
        type: Boolean
    },
    total_marks_obtained_passage: {
        type: Number,
    },  questionpaperMarks_passage: {
        type: Number,
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

    },
    updated_by: {
        type: Number,

    },
    deleted_on: {
        type: Date,

    },
    deleted_by: {
        type: Number,

    },
    tablestatus: {
        type: String,
        required: true
    },

    submitted_on: {
        type: Date
    },
    review_status: {
        type: String
    },
    review_on: {
        type: Date
    },
    total_marks_obtained: {
        type: Number

    },
    total_marks_obtained_first_attempt: {
        type: Number
    },
    questionpaperMarks: {
        type: Number
    },
    how_many_attempt_for_this_set: {
        type: Number

    },
    question_details_array: {
        type: Array
    },

    final_status: {
        type: String
    },
    is_latest: {
        type: Boolean
    },
    isnextroundOpen: {
        type: Boolean
    }


});


// whole row will store final attempt of set , previous attempt are stored in previous_attempots col of question table row,with all details,

const submitted_answer = module.exports = mongoose.model('submitted_answer', submitted_answerSchema);

