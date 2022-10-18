var express = require('express');
const router = express.Router();
const imgModal = require('../dataModals/images.modal')
const ObjectID = require('mongoose').Types.ObjectId;


// Get Route 

const getImages =  (req, res) => {

    imgModal.find((err, doc) => {
        if (err) {
            console.log('Error in get Data' + err)
        } else {
            res.send(doc);
        }
    })
}


// Post User

const addImages = async (req, res) => {
    try {
        console.log(req.body);

        let user = await new imgModal({
            imageURl: req.body.imageURl,
            imageTitle: req.body.imageTitle,
            imageDesc: req.body.imageDesc,
        }).save()

        
        return res.status(200).json
            ({
                Message: "Success",
                user: user
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

// Update Data 

const updataImages = (req, res) => {

    let user = {
        imageURl: req.body.imageURl,
        imageTitle: req.body.imageTitle,
        imageDesc: req.body.imageDesc,
    }

    if (ObjectID.isValid(req.params.id)) {
        imgModal.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
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

// Delete Data 

const delImages  = (req, res) => {

    if (ObjectID.isValid(req.params.id)) {
        imgModal.findByIdAndRemove(req.params.id, (err, doc) => {
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


module.exports = {getImages,addImages,updataImages,delImages}