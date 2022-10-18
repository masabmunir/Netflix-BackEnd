var express = require('express');

var videoModel = require('../dataModals/videomodel')
const ObjectID = require('mongoose').Types.ObjectId;

exports.getVideos= (req, res)=>{

    videoModel.find({},(err, doc) => {
        if (err) {
            console.log('Error in get Data' + err)
        } else {
            res.send(doc);
            console.log("get request")
        }
    })
  
}

exports.findbyTitle = (req, res)=>{
    videoModel.find({title:req.params.title}, (err, found)=>{
        if (err) {
            console.log('Not Found')
        } else {
            res.send(found);
            console.log("Found!")
        }
    })
}

exports.postVideos=(req, res)=>{
    try {
        console.log(req.body);

        let video =  new videoModel({
            title: req.body.title,
            genre:req.body.genre,
            IsloggedIn:req.body.IsloggedIn


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

exports.UpdateVideos=(req, res)=>{
   
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


exports.DeleteVidoes=(req, res)=>{
   
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
