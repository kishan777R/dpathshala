var mongoose = require('mongoose');





const VideoscompletedstatusSchema = mongoose.Schema({
   
    c_id_int:{
        type: Number
        
    },lasttimetillwatched:{
        type: Number
        
    },
    video_id: {
        type: String,
        required: true
    }, 
    is_completed: {
        type: String,
        required: true
    },
    
    created_on: {
        type: Date,
     
    },
    updated_on: {
        type: Date,
        
    },
    
});

const videoscompletedstatus = module.exports = mongoose.model('Videoscompletedstatus', VideoscompletedstatusSchema);