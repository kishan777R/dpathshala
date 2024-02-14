var mongoose = require('mongoose');





const temporderSchema = mongoose.Schema({
     
     
    order_no: {
        type: String,
        required: true
    },
    
    bank_array: {
        type: Array,
        required: true
    },

    created_on: {
        type: Date,
        required: true
    }
    
     

});

const TempOrders = module.exports = mongoose.model('TempOrders', temporderSchema);