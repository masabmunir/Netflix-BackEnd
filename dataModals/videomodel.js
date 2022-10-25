const { unique } = require('joi/lib/types/array');
const string = require('joi/lib/types/string');
const mongoose = require('mongoose');



const videoModel = mongoose.Schema({
    // title:{
    //     type:String,
    //     required:true
    // },
  
    // Poster:{
    //     type:String
    // },
    // url:{
    //     type:String,
    //     required:true
    // },
    // IsloggedIn:{
    //     type:Boolean,
    //     required:true
    // },
    // genre:{
    //     type:String,
    //     required:true
    // }
    title:{
        type:String,
        unique:false
    },
    genre:{
        type:String,
        unique:false
    },
    IsloggedIn:{type:Boolean},
                unique:false
 
})


module.exports = mongoose.model('videos',videoModel,);