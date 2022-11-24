var express = require('express');
const router = express.Router();
const userDetails = require('../dataModals/userdetail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectID = require('mongoose').Types.ObjectId;
const nodemailer = require('nodemailer');
const details = require('../details/details.json')
//Get User

const Users = (req, res) => {
    userDetails.find((err, doc) => {
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

        let user = await new userDetails({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).save()
 
        // Used to send mail
        sendMail(user,info=>{
            console.log(`Mail has been send ${info.id}`);
            res.send(info);
        })
        // End's Here
    
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

// Mail function 
async function sendMail(user,callback){

    async function main() {
        // SMTP config
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com", //
          port: 587,
          auth: {
            user: "masabk214@gmail.com", // Your Ethereal Email address
            pass: "suapdlwcbgjowdoh", // Your Ethereal Email password
          },
        }); // Send the email
        let info = await transporter.sendMail({
          from: '"Masab khan" <masabk214@gmail.com>',
          to: user.email, // Test email address
          subject: "Welcome to Netflix!",
          text: "Here's a text version of the email.",
          html: "Here's an <strong>HTML version</strong> of the email.",
        });
        console.log("Message sent: %s", info.messageId); // Output message ID
        console.log("View email: %s", nodemailer.getTestMessageUrl(info)); // URL to preview email
      }
      // Catch any errors and output them to the console
      main().catch(console.error);
    
}


// Login USer

const loginUsers = async (req, res) => {
    const { email, password } = req.body;
    userDetails.findOne({ email: email }, async(err, userDetails) => {
        if (userDetails) {
            if (password === userDetails.password) {
                const token = await userDetails.generateAuthToken();
                console.log("token is " + token);

                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 30000),
                    httpOnly: true
                });
                res.send({ message: "login successfully", userDetails: userDetails })
            } else {
                res.send({ message:"Invalid credentials"})
            }
        }
        else {
            res.send({ message: "Not Registered"})
        }
    })
}

// Delete Data

const delData = (req, res) => {

    if (ObjectID.isValid(req.params.id)) {
        userDetails.findByIdAndRemove(req.params.id, (err, doc) => {
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