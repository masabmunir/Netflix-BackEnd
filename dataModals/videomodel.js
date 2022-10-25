const mongoose = require('mongoose');



const videoModel = mongoose.Schema({
    title: {
        type: String,
        unique: false
    },
    genre: {
        type: String,
        unique: false
    },
    IsloggedIn: { type: Boolean },
    unique: false

})


module.exports = mongoose.model('videos', videoModel,);