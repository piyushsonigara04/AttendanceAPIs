const mongoose = require("mongoose");

const PanelSchema = new mongoose.Schema({
    students:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    teachers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }],
    timetable:[
        {
            subject:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject'
            },
            teacher:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Teacher'
            },
            location:{
                type:String
            },
            timing:{
                type:String
            }
        }
    ]

})