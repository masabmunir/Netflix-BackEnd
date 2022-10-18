
const mongoose = require('mongoose');

const songModel = mongoose.Schema({

  
    title:{
        type:String,
        unique:false
    },
    genre:{
        type:String,
        unique:false
    },
    singerName:{
        type:String
    }
 
})


module.exports = mongoose.model('songs',songModel,);