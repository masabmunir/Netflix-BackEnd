const express = require("express");
const router = express.Router();
const contr= require('../Controllers/videos-controller')
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

      const upload = multer({
        storage: storage
      });


router.get("/getVideos", contr.getVideos);

router.get("/getByTitle/:title", contr.findbyTitle);

router.post("/postVideos",upload.single('file'), contr.postVideos);

router.patch("/updateVideos/:id", contr.UpdateVideos);

router.delete("/deleteVideos/:id", contr.DeleteVidoes);

module.exports = router ;
