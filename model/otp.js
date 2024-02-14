var mongoose = require('mongoose');





const otpSchema = mongoose.Schema({
    c_id_int:{
        type: Number,
       
    } ,
    created_on: {
        type: Date,
       
    },
    action: {
        type: String,
       
    },
    otp: {
        type: Number,
       
    },
    mobile: {
        type: Number,
       
    },
    otp_status: {
        type: String,
       
    },
});

const OTP = module.exports = mongoose.model('otp', otpSchema);