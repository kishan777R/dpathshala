var mongoose = require('mongoose');





const CouponsSchema = mongoose.Schema({
   
    couponPercent: {
        type: Number,
        required: true
    },
    coupon: {
        type: String,
        required: true
    },
    status:{
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
});

const Coupons = module.exports = mongoose.model('Coupons', CouponsSchema);