var mongoose = require('mongoose');





const AskedSchema = mongoose.Schema({

    chatnumber: {
        type: Number,

    },
    asked_question: {
        type: String,

    },
    seen_by_admin: {
        type: Boolean,

    }, 
    websitelinkofquestionforuser: {
        type: String,

    }, 
    filePath: {
        type: String,

    },
    serverpath: {
        type: String,

    },
    filetype: {
        type: String,

    },
    
    answer_seen_by_user: {
        type: Boolean,

    },
    answer: {
        type: String,

    },
    module: {
        type: String,

    },
    weekOrday: {
        type: String,

    },
    test_level: {
        type: Number,

    },
     question: {
        type: String,

    },
    question_id: {
        type: String,

    },  tutorial: {
        type: String,

    },
    tutorial_id: {
        type: String,

    }, video: {
        type: String,

    },
    video_id: {
        type: String,

    },
    
    exam_date: {
        type: Date,

    },
   
    course_id:{
        type: String,
    }, 
    sub_course_id:{
        type: String,
    },
    created_on: {
        type: Date,
        required: true
    },
    c_id_int: {
        type: Number,
        
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
     
    answergivenon: {
        type: Date,

    }
    ,
    answergiven_by: {
        type: Number,

    },
    
    tablestatus: {
        type: String,
        required: true
    },
});

const Asked = module.exports = mongoose.model('Asked', AskedSchema);