const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { string } = require('joi');

const userdetails = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isActive: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('detail',userdetails);
