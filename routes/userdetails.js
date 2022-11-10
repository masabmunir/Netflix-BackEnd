var express = require('express');
const router = express.Router();
const userdetails = require('../dataModals/userdetail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const  { Users,addUser,loginUsers,delData } = require('../Controllers/userdetails');
const contr= require('../Controllers/userdetails')
const ObjectID = require('mongoose').Types.ObjectId;


router.get('/', Users);

router.post('/signUp', addUser);

router.post('/signIn', loginUsers);

router.delete('/:id', delData)


module.exports = router ;