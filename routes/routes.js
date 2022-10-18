var express = require('express');
const router = express.Router();
const userdata = require('../dataModals/userinfo.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { addUser, singleUser, getUser, addWebUser, loginUser, updateData, delData } = require('../Controllers/users-controller');
const contr= require('../Controllers/videos-controller')
const ObjectID = require('mongoose').Types.ObjectId;

//Get Api

router.get('/', getUser); 

//Get Id of Single Person

router.get('/:id', singleUser);

//Post Api

router.post('/signUp', addUser);

// Data Post Inside Website

router.post('/addUser', addWebUser);

// Api of Login Component

router.post('/loginUser', loginUser);

// Put ( Update ) Data

router.put('/:id', updateData);

// Delete Data

router.delete('/:id', delData);

// Video Routes.


module.exports = router;