var mongoose = require('mongoose');
const  Schema = mongoose.Schema({
    first_name: {
        type: String,

    },
    last_name: {
        type: String,

    },
    table_id_for_query: {
        type: Number,

    },
    teacher_id_int: {
        type: Number,

    },
    teacher_id: {
        type: Number,

    },
    mobile: {
        type: String,

    },
    phone: {
        type: String,

    },
    email: {
        type: String,

    }, 
    introvideo_server: {
        type: String,

    },
    introvideo: {
        type: String,

    },
    teacher_image: {
        type: String,

    },
    teacher_image_server: {
        type: String,

    },
    password: {
        type: String,

    },
    dob: {
        type: String,

    },
    country: {
        type: String,

    },
    state: {
        type: String,

    },
    city: {
        type: String,

    },
    pincode: {
        type: Number,

    },
    about: {
        type: String,

    },
    education: {
        type: String,


    },skill: {
        type: String,


    },
    profile_status: {
        type: String,

    },
    profile_status_changed_by: {
        type: Number,

    },
    profile_status_changed_on: {
        type: Date,

    },
    profile_rejection_reason: {
        type: Array,

    },
    created_on: {
        type: Date,

    },
    created_by: {
        type: Number,

    },
    updated_on: {
        type: Date,

    },
    updated_by: {
        type: Number,

    },
    verificationcode: {
        type: String,

    },
    email_verification: {
        type: Boolean,
    },
     facebook:{
        type: String,
     },
     twitter:{
        type: String,
    },
    linkedin:{
        type: String,
    },
    
    deleted_on: {
        type: Date,

    },
    deleted_by: {
        type: Number,

    },
    tablestatus:{
        type: String,
    },
    teachercourse:{
        type: Array,
    }
});

const teacher = module.exports = mongoose.model('teacher',  Schema);