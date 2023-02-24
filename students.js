const mongoose = require('mongoose');
const validator = require('validator');

const student = mongoose.model('students',{
    name:{
        type:String,
        required:true,
        minlength:3,
    },
    email:{
        type:String,
        validate(type){
            if(!validator.isEmail(type)){
                console.log("Not A valid email-ID");
            }
        },
        unique:[true,"Email ID Already Present"]
    },
    phone:{
        type:Number,
        minlength:10,
        maxlength:10,
        required:true,
        unique:true,
    },
    address:{
        type:String,
        required:true,

    }
})

module.exports = student;

