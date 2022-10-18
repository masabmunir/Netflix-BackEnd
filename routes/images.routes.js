var express = require('express');
const { getImages, addImages, delImages, updataImages } = require('../Controllers/images-controller');
const router = express.Router();
const imgModal = require('../dataModals/images.modal')
const ObjectID = require('mongoose').Types.ObjectId;


router.get('/',getImages);

//Post Request

router.post('/addImage',addImages);

//Update Data 

router.put('/:id', updataImages);

// Delete Data 

router.delete('/:id', delImages);

module.exports = router;