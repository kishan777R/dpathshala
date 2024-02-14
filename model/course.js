var mongoose = require('mongoose');
const courseSchema = mongoose.Schema({
    course_name: {
        type: String,
        required: true
    },
    course_int: {
        type: Number,
    },
    iconforfirstcategory: {
        type: String,
    },
    wheretoshowinwebsite: {
        type: String,
    },
    showbackground: {
        type: Boolean
    },
    adding_date: {
        type: Date,
        required: true
    },
    imagepath: {
        type: String,

    },
    demovideopath: {
        type: String,

    },
    thumbnailpath: {
        type: String,

    },
    sub_title:{type:String},
    teacherimagepath:{type:String},
    teacher_occupation:{type:String},
    teacher_email:{type:String},
    teacher_about:{type:String},

    studentnumber: {type:String},
    skilllevel: {type:String},
    language: {type:String},




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
    parent_course: {
        type: String,
        required: true
    },
    subjectcode: { type: String },
    bonus_subject_id: { type: Array },
    subjectstatus: { type: String },
    certificate_type: { type: String },

    amount: {
        type: Number,
        required: true
    }, 
     pre_amount: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        required: true
    },
    duration_type: {
        type: String,

    },
    is_self_paced: {
        type: Boolean
    },
    main_course_name: {
        type: String,

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
    created_by_name: {
        type: String,
        default: "Admin"
    },
    rating: {
        type: Number,
        default:4

    },
    // below columns are for level of main course
    level_number: {
        type: Number,
        default: 1
    },
    upper_level_id: {
        type: String,
        default: ''
    },
    is_it_last_level: {
        type: Boolean,
        default: true
    },
    //   below columns are for level of main course end





    //
});

const Course = module.exports = mongoose.model('Course', courseSchema);