const mongoose = require("mongoose")
const URL = "mongodb://localhost:27017/AttendanceDB"

const dbConnect = ()=>{
    mongoose.connect(URL)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.error("Error while connecting to DB:", err));
}

module.exports = dbConnect;