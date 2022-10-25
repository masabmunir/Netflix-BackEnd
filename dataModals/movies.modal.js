const mongoose = require('mongoose');


const galleryMovie = mongoose.Schema({

    // id:String,
    moviesURl:String,
    moviesTitle:String,
    moviesDetail:String,
    moviesCategories:String,
    moviesPoster:String,
    file:{
        data: Buffer,
        contentType: String
        }
    

})

module.exports = mongoose.model('movies',galleryMovie);