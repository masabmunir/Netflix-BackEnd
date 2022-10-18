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

// For uploading large images/videos

app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 500000}))


const videoModel = require('./routes/videoroute');
const songModal = require('./routes/sound.routes');


const port = process.env.port || 8000



var allowCrossDomain = function(req, res) {

   res.setHeader('Access-Control-Allow-Origin', "*")

}
app.use(cors({allowCrossDomain}))
// app.use(cors({origin:'http://localhost:4200/'}));
app.use(bodyParser.json());


app.use('/data',userRoutes);

app.use('/',imageRoutes);

app.use('/movies',movieRoutes);

app.use('/', videoModel )

app.use('/', songModal);



app.listen(port,()=>{

   console.log('Server Started at port 8000');
})
