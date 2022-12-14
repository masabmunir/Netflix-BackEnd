var express = require('express');
const router = express.Router();
const movModal = require('../dataModals/movies.modal')
const ObjectID = require('mongoose').Types.ObjectId;
const { delUser, getMovies, singleMovies, addMovies, updateMovies, delMovies } = require('../Controllers/movie-controller');
const Grid = require('gridfs-stream');
const multer = require("multer");
const mongoose = require('../db/conn');
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

 
    // const multerStorage = multer.diskStorage({
    //     destination: (req, file, cb) => {
    //       cb(null, "public");
    //     },
    //     filename: (req, file, cb) => {
    //       const ext = file.mimetype.split("/")[1];
    //       cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    //     },
    //   });
      const upload = multer({
        storage: storage
        // fileFilter: multerFilter,
      });
    
// Getting all Movie's

router.get('/', getMovies)

// Getting ID of Single Movie

router.get('/:id', singleMovies);

// Post Request 
router.post('/addMovie',upload.single('file'), addMovies);
//Update Route

router.put('/:id',updateMovies);

// Delete Route 

router.delete('/:id',delMovies);


module.exports = router;