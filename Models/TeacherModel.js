const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    prn:{
        type:mongoose.Schema.Types.BigInt,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    subjects:[{
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        },
        panels : {
            type: [String],
            default: []
        },
    }]
});

module.exports = mongoose.model("Teacher",TeacherSchema)