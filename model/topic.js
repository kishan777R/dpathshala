var mongoose = require('mongoose');





const topicSchema = mongoose.Schema({
 
    
    course_id: {
        type: String,
        
    },
    sub_course_id: {
        type: String,
        
    },
   
    topic_name: {
        type: String,
        
    },
    adding_date: {
        type: Date,
       
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
    },
    created_by_name: {
        type: String,
        default: "Admin"
    },
});

const topics = module.exports = mongoose.model('Topics', topicSchema);