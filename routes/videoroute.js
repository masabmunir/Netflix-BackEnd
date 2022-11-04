const express = require("express");
const router = express.Router();
const contr= require('../Controllers/videos-controller')



router.get("/getVideos", contr.getVideos);

router.get("/getByTitle/:title", contr.findbyTitle);

router.get("/getVideo/:id", contr.findVideoById);

router.post("/postVideos", contr.postVideos);

router.put("/updateVideos/:id", contr.UpdateVideos);

router.delete("/deleteVideos/:id", contr.DeleteVidoes);

module.exports = router ;
