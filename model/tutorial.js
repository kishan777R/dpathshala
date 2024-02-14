var mongoose = require('mongoose');





const tutSchema = mongoose.Schema({
    
    course_id: {
        type: String,
        
    },
    sub_course_id: {
        type: String,
        
    },
    describeArr: {
        type: Array,
        
    },
    
    day_number:{
        type:Number
    },
    topic:{
        type:String
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
        required: true
    }
});

const Tutorials = module.exports = mongoose.model('Tutorials', tutSchema);