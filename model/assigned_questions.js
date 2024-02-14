var mongoose = require('mongoose');
const assigned_questionSchema = mongoose.Schema({
    c_id: {
        type: String,
        required: true
    },
    question_id: {
        type: String,
        required: true
    },
    question_id_join_query:{
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
    day_number:{
        type: Number,
    },
    test_level: {
        type: Number,
        required: true
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
    questiondata: {
        type: Array,
        require: true
    },
  
});


 
const assigned_questions = module.exports = mongoose.model('assigned_questions', assigned_questionSchema);