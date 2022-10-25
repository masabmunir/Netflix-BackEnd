var express = require('express');
const multer = require("multer");
const mongoose = require('./db/conn');
const router = express.Router();
const movModal = require('./dataModals/movies.modal')
const ObjectID = require('mongoose').Types.ObjectId;
const {getMovies, singleMovies, addMovies, updateMovies, delMovies } = require('./Controllers/movie-controller');

const {
  GridFsStorage
} = require("multer-gridfs-storage");

require("dotenv")
  .config();

//   Bucket
  let bucket;
  mongoose.connection.on("connected", () => {
    var db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: "newBucket"
    });
    console.log(bucket);
  });

//   Storage
  storage = new GridFsStorage({
   url: 'mongodb://localhost:27017/websitework',
   file: (req, file) => {
     return new Promise((resolve, reject) => {
       const filename = file.originalname;
       const fileInfo = {
         filename: filename,
         bucketName: "newBucket"
       };
       resolve(fileInfo);
     });
   }
 });
 
upload = multer({storage});

router.get('/', getMovies)

// Getting ID of Single Movie

router.get('/:id', singleMovies);

// Post Request 
router.post('/addMovie',upload.single('file'), addMovies, {

   
   
    
        
});
//Update Route

router.put('/:id',updateMovies);

// Delete Route 

router.delete('/:id',delMovies);


module.exports = router;