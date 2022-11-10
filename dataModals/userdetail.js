const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { string } = require('joi');

const userDetails = mongoose.Schema({

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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})


userDetails.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()}, "fdvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(e){
    
        console.log("error part" + e);
    }
}

module.exports = mongoose.model('userDetails',userDetails);
