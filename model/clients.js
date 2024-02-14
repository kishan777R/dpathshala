var mongoose = require('mongoose');





const clientSchema = mongoose.Schema({
    c_id_int: {
        type: Number,

    },
    customer_id_int: {
        type: Number,

    },
    app_or_website: {
        type: String,
        default:"APP"
    },
    login_user_type: {
        type: String,
        default:"STUDENT"
    },
    his_affilitater_c_id_int: {
        type: Number,
        default:-1
    },

    bank: {
        type: String,

    },
    ifsc: {
        type: String,

    },
    accountnumber: {
        type: String,

    },

    customer_id: {
        type: String,

    },
    client_added_by: {
        type: String,

    },
    profile_verified: {
        type: String,
        default:false

    },
    profile_verify_otp: {
        type: Number,
       

    },
    password: {
        type: String,
       

    },
    first_name: {
        type: String,

    },
    last_name: {
        type: String,

    },
    profile_status: {
        type: String,

    },
    email: {
        type: String,

    },
    mobile: {
        type: String,

    },
    state: {
        type: String,

    },
    city: {
        type: String,

    },
    pincode: {
        type: String,

    },
    address: {
        type: String,

    },
    address2: {
        type: String,

    },
    alternate_mobile: {
        type: String,

    },
    adding_date: {
        type: Date,

    },


    course: {
        type: [{
            course_name_at_time_of_purchase: String,
            sub_course_name_at_time_of_purchase: String,
            course_id: String,
            sub_course_id: String,
            duration: String,
            duration_type: String,
            is_self_paced: Boolean,
            starting_date: Date,
            ending_date: Date,
            certificate_issued: String,
            certificate_issued_date: Date,
            course_status: String,
            final_status: String,
            exam_date_and_day_number_array:Array,
            order_added_by: String,
            generated: Boolean,

        }],
        //required: true
    },
    orders: {
        type: Array,
        // required:true
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
    image_path: {
        type: String,
        default:''

    },
    serverpath: {
        type: String,
        default:''
    }
});

const Clients = module.exports = mongoose.model('Clients', clientSchema);