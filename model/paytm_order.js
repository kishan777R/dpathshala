var mongoose = require('mongoose');
const paytmresponseFortokenSchema = mongoose.Schema({
    paytmdata: {
        type: String,
        required: true
    } 
});


 
const paytmresponseFortoken = module.exports = mongoose.model('paytmresponseFortoken', paytmresponseFortokenSchema);