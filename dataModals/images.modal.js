const mongoose = require('mongoose');


const galleryImages = mongoose.Schema({
    // id:String,
    imageURl:String,
    imageTitle:String,
    imageDesc:String,
    // uploaded:{type:Date , default:Date.now},
})

module.exports = mongoose.model('gallery',galleryImages,);