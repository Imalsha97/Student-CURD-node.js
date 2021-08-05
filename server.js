const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

//import dependencies

//import dotenv
require("dotenv").config();

//port create
//work with available port (process.env.PORT), localmachine run in port 8070
const PORT = process.env.PORT || 8070 ;

//use the app
app.use(cors());


//use the json
app.use(bodyParser.json());

//import mongodb url
const URL = process.env.MONGODB_URL;

//hope from db
mongoose.connect(URL, {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false

});

//make connection
const connection = mongoose.connection;
//first time open db
connection.once("open", () => {
    console.log("MONGODB CONNECTION SUCCESS!");
})

//imports the routers
const StudentRouter = require("./routes/students.js");

//url start
app.use("/student",StudentRouter);


app.listen(PORT, () => {
    console.log(`server is up and ruuning on  port ${PORT}`)
})





