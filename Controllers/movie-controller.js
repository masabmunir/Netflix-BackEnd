var express = require('express');
const router = express.Router();
const movModal = require('../dataModals/movies.modal')
const ObjectID = require('mongoose').Types.ObjectId;

// const database = require("../db/conn");
// var mongoose = require('mongoose');
// var Grid = require('gridfs-stream');
// var fs = require('fs');
// var conn = require('../db/conn');

// var  gfs = Grid( mongoose.connection, mongoose.mongo );

var mongoose=require("mongoose");
var gridfsstream=require("gridfs-stream");
var fs=require("fs");
var conn=mongoose.connection;
gridfsstream.mongo=mongoose.mongo;

// Get Data 

const getMovies = (req, res) => {

    movModal.find((err, doc) => {
        if (err) {
            console.log('Error in get Data' + err)
        } else {
            res.send(doc);
        }
    })

}

// Getting Data of Single User

const singleMovies = (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
        movModal.findById(req.params.id, (err, doc) => {
            if (err) {
                console.log('Error in get data' + err)
            } else {
                res.send(doc);
            }
        })
    } else {
        res.status(400).send('No record found with ID' + req.params.id);
    }
}

 // Post Request 

 const addMovies =  async(req, res) => {
    console.log(req.file);

    // // try {

        let user = new movModal({
            moviesURl: req.file.filename,
            // moviesTitle: req.body.moviesTitle,
            // moviesDetail: req.body.moviesDetail,
            // moviesCategories: req.body.moviesCategories,
            // moviesPoster: req.body.moviesPoster,
        });

        await user.save();
    // try {
    //     const newFile =  File.create({
    //       name: req.file.filename,
    //     });
    //     res.status(200).json({
    //       status: "success",
    //       message: "File created successfully!!",
    //     });
    //   } catch (error) {
    //     res.json({
    //       error,
    //     });
    //   }
    
       
     

            
        
       

    //     return res.status(200).json
    //         ({
    //             Message: "Success",
    //             user: user
    //         })


    // }
    // catch (error) {
    //     console.log(error)
    //     return res.status(400).json({
    //         message: "Error",
    //         error: error
    //     })
    // }

}

 // Update Data 

 const updateMovies  = (req, res) => {

    let user = {
        moviesURl: req.body.moviesURl,
        moviesTitle: req.body.moviesTitle,
        moviesDetail: req.body.moviesDetail,
        moviesCategories: req.body.moviesCategories,
        moviesPoster: req.body.moviesPoster,
    }

    if (ObjectID.isValid(req.params.id)) {
        movModal.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
            if (err) {
                console.log('Data is Deleted' + err)
            } else {
                res.send(doc);
            }
        })
    } else {
        res.status(400).send('No record found with ID' + req.params.id);
    }
}


// Delete User 

const delMovies = (req, res) => {

    if (ObjectID.isValid(req.params.id)) {
        movModal.findByIdAndRemove(req.params.id, (err, doc) => {
            if (err) {
                console.log('Data is Deleted' + err)
            } else {
                res.send(doc);
            }
        })
    } else {
        res.status(400).send('No record found with ID' + req.params.id);
    }
}


module.exports = {getMovies,singleMovies,addMovies,updateMovies,delMovies}