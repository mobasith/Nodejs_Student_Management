const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema({
    studentId:{type: String, required: true, unique: true},
    name:{type: String, required: true},
    branch:{type: String, required: true},
    email:{type: String, required: true},
    phone:{type: Number,required: true},

});

module.exports= mongoose.model('Student',studentSchema);