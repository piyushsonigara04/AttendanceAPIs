const express = require("express");
const app = express()

//middlewares
app.use(express.json())

//mounting routes
const Routes = require("./Routes/routes");
app.use("/api/v1", Routes);

//Database connection
const dbConnect = require("./Config/database");
dbConnect();

app.listen(4000,()=>{
    console.log("Server is running on port 4000")
})
