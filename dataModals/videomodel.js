const { unique } = require('joi/lib/types/array');
const string = require('joi/lib/types/string');
const mongoose = require('mongoose');



const videoModel = mongoose.Schema({
   
    videoTitle:String,
    videogenre:String,
    videoURL:String,

})


module.exports = mongoose.model('videos', videoModel,);