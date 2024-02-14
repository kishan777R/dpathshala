var mongoose = require('mongoose');





const orderSchema = mongoose.Schema({
    c_id_int: {
        type: Number,

    },
    course_id: {
        type: String,

    },
    sub_course_id: {
        type: String,

    },
    order_no: {
        type: String,

    },
    his_affilitater_c_id_int: {
        type: Number,
        default:-1
    },
    total_amount: {
        type: Number,

    },
    single_or_multiple: {
        type: String,
        default:"Single"

    },
    invoice: {
        type: String,
    }, invoice_int: {
        type: Number,
    },
    order_date: {
        type: Date,

    },
    order_status: {
        type: String,

    },
    coupon: {
        type: String,

    },
    couponPercent: {
        type: Number,

    },
    igst: {
        type: Number,

    },
    cgst: {
        type: Number,

    },
    sgst: {
        type: Number,

    },
    tottax: {
        type: Number,

    },
    state: {
        type: String,

    },

    amount: {
        type: Number,

    },
    taxableamount: {
        type: Number,

    },
    itemamount: {
        type: Number,

        // without gst (i.e net amount)
    },
    discount: {
        type: Number,

    },
    paid_amount: {
        type: Number,

    },
    bank_array: {
        type: Array,

    },

    created_on: {
        type: Date,

    }
    ,
    payment_recieved_on: {
        type: Date,

    }

});

const Orders = module.exports = mongoose.model('Orders', orderSchema);