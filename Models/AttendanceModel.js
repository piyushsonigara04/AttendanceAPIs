const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    date : {
        type : Date,
        required : true
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject"
    },
    students:[
        {
            stdId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Student"
            },
            attendance:{
                type : Boolean
            }
        }
    ]
})