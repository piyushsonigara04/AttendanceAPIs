const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    courseName : {
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },  
    num_of_panels:{
        type:Number,
        required:true
    },
    subjects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subject'
    }],
    num_of_students:{
        type:Number,
        required:true
    },
    faculties:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
    }]
});

module.exports = mongoose.model("Course",CourseSchema);