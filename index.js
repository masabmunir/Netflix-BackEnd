var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./db/conn');
const nodemailer = require('nodemailer');

 // User Path
const userRoutes = require('./routes/routes');
// Images Path
const imageModal = require('./dataModals/images.modal');
const imageRoutes = require('./routes/images.routes');
// Movies Path
const movieModal = require('./dataModals/movies.modal');
const movieRoutes = require('./routes/movies.routes');
// User Detail Routes 
const userdetailModel = require('./dataModals/userdetail');
const userdetailRoutes = require('./routes/userdetails')
const storage = require('./storage');




// For uploading large images/videos

app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))
  
  //to parse json content
  app.use(express.json());
  //to parse body from url
  app.use(express.urlencoded({
    extended: false
  }));
  

const videoModel = require('./routes/videoroute');
const songModal = require('./routes/sound.routes');
const { db } = require('./dataModals/images.modal');


const port = process.env.port || 8000



var allowCrossDomain = function(req, res) {

   res.setHeader('Access-Control-Allow-Origin', "*")

}
app.use(cors({allowCrossDomain}))
app.use(bodyParser.json());


app.use('/data',userRoutes);

app.use('/',imageRoutes);

app.use('/movies',movieRoutes);

app.use('/', videoModel );

app.use('/', songModal);

app.use('/userdetail',userdetailRoutes)

app.listen(port,()=>{

   console.log('Server Started at port 8000');
})
