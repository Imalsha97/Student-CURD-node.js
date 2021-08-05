const mongoose = require('mongoose');

//make the schema
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    age : {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
        },
    address: {
            type: String,
            required: true
            }
})
//table name Student1
const Student = mongoose.model("Student1",studentSchema);
module.exports =  Student;
