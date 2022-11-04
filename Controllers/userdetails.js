var express = require('express');
const router = express.Router();
const userdetails = require('../dataModals/userdetail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectID = require('mongoose').Types.ObjectId;

//Get User

const Users = (req, res) => {
    userdetails.find((err, doc) => {
        if (err) {
            console.log('Error in get Data' + err)
        } else {
            res.send(doc);
        }
    })
}


// Add user 

const addUser =  async (req, res) => {
    try {

        let user = await new userdetails({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
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


// Login USer

const loginUsers = async (req, res) => {
    const { email, password } = req.body;
    userdetails.findOne({ email: email }, async(err, userdetails) => {
        if (userdetails) {
            if (password === userdetails.password) {
                const token = await userdetails.generateAuthToken();
                console.log("token is " + token);

                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 30000),
                    httpOnly: true
                });
                res.send({ message: "login successfully", userdetails: userdetails })
            } else {
                res.send({ message: "wrong credentials" })
            }
        }
        else {
            return res.json({message:"not register"})
        }
    })
}

// Delete Data

const delData = (req, res) => {

    if (ObjectID.isValid(req.params.id)) {
        userdetails.findByIdAndRemove(req.params.id, (err, doc) => {
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



module.exports = {Users,addUser,loginUsers,delData}