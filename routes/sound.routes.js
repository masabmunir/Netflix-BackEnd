const express = require("express");
const router = express.Router();
const contr= require('../Controllers/songs-controller')



router.get("/getSongs", contr.getSongs);

router.get("/getByTitle/:title", contr.findbyTitle);

router.post("/postSongs", contr.postSongs);

router.patch("/UpdateSongs/:id", contr.UpdateSongs);

router.delete("/deleteSongs/:id", contr.DeleteSongs);

module.exports = router ;