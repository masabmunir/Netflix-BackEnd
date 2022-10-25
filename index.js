var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./db/conn');
 // User Path
const userRoutes = require('./routes/routes');
// Images Path
const imageModal = require('./dataModals/images.modal');
const imageRoutes = require('./routes/images.routes');
// Movies Path
const movieModal = require('./dataModals/movies.modal');
const movieRoutes = require('./routes/movies.routes');

// For Video and Songs
const videoModel = require('./routes/videoroute');
const songModal = require('./routes/sound.routes');



const storage = require('./storage');



  
  //to parse json content
  app.use(express.json());
  //to parse body from url
  app.use(express.urlencoded({
    extended: false
  }));
  


// For uploading large images/videos

app.use(bodyParser.json({
   limit: '50mb'
 }));
 
 app.use(bodyParser.urlencoded({
   limit: '50mb',
   parameterLimit: 100000,
   extended: true 
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

app.use('/', videoModel )

app.use('/', songModal);


app.listen(port,()=>{

   console.log('Server Started at port 8000');
})
