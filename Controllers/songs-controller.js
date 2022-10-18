var express = require('express');

var songModel = require('../dataModals/songModal')
const ObjectID = require('mongoose').Types.ObjectId;

exports.getSongs= (req, res)=>{

    songModel.find({},(err, doc) => {
        if (err) {
            console.log('Error in get Data' + err)
        } else {
            res.send(doc);
            console.log("get request")
        }
    })
  
}

exports.findbyTitle = (req, res)=>{
    songModel.find({title:req.params.title}, (err, found)=>{
        if (err) {
            console.log('Not Found')
        } else {
            res.send(found);
            console.log("Found!")
        }
    })
}

exports.postSongs=(req, res)=>{
    try {
        console.log(req.body);

        let video =  new songModel({
            title: req.body.title,
            genre:req.body.genre,
            singerName:req.body.singerName
          


        }).save();
        
        console.log('dATA INSERTED');
        return res.status(200).json
            ({
                Message: "Success",
                
            })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Error",
            error: error
        })
    }
}

exports.UpdateSongs=(req, res)=>{
   
    console.log(req.params.id);
    
    videoModel.findOneAndUpdate(req.params.id, req.body, {new: true}, (error, result) => {
        if (error) {
          console.log('error')
          return res.status(400).send(error)
        }
    
        res.status(200).send(result)
        console.log("updated");
      });
 
}


exports.DeleteSongs=(req, res)=>{
   
    console.log(req.params.id);
    
    videoModel.findByIdAndRemove(req.params.id, (error, result) => {
        if (error) {
          console.log('error')
          return res.status(400).send(error)
        }
    
        res.status(200).send(result)
        console.log("Deleted!");
      });
 
   
}
