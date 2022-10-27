const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeemodel = new Schema({
    name: String,
    location:String,
    position:String,
    salary:Number
})

const employee = mongoose.model('Employee', employeemodel);
module.exports = employee;