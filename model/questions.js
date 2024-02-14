var mongoose = require('mongoose');





const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    question_id_join_query:{
        type: String,
        required: true
    },
    question_type:{
        type: String,
    },
    course_id: {
        type: String,
        required: true
    },
    sub_course_id: {
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    sub_course_name: {
        type: String,
        required: true
    },
    adding_date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    level: {
        type: String,
        // required:true
    },
    day_number:{
        type: Number,
    },
     remark: {
        type: String,
        // required:true
    },
    audio_line: {
        type: String,
        // required:true
    },
    mark: {
        type: Number,
         required:true
    },
    duration_of_question:{
        type:Number
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

const Questions = module.exports = mongoose.model('Questions', questionSchema);