const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    units:[String],
    lectures:[String]
})

module.exports = mongoose.model("Subject",SubjectSchema);