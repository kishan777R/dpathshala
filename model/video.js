var mongoose = require('mongoose');





const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details:{
        type: String,
        required: true
    },
    order_number:{
        type: Number
        
    },
    course_id: {
        type: String,
        required: true
    },
    sub_course_id: {
        type: String,
        required: true
    },
    topic_id: {
        type: String,
        required: true
    },
    topic_name: {
        type: String,
        required: true
    },
    adding_date: {
        type: Date,
        required: true
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
    videoduration:{
        type: String
        
    },
    videodurationHMS:{
        type: String
        
    },
    
    imagepath: {
        type: String,
        required: true
    },
    serverpath: {
        type: String,
        required: true
    },
    active_status: {
        type: String,
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
    created_by_name: {
        type: String,
        default: "Admin"
    },
});

const videos = module.exports = mongoose.model('Videos', videoSchema);