const express = require("express");
const path = require("path");
const router = express.Router();
const { getVideos } = require("./vimeo/searchApi");

router.use(express.static("public"));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/", "home.html"));
});

router.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/", "search.html"));

  console.log("get video search screen");
});

router.get("/player", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/", "player.html"));
  console.log("get player");
});

router.get("/player/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/", "home.html"));
  console.log("get player with video ID and display");
});

router.post("/search", async (req, res) => {
  const query = req.body.data; //query received from client input
  const vimeoData = await getVideos(query); //response received from Vimeo API - wait for the promise to be fulfilled
  const videos = vimeoData.data; //video data 
  res.send(videos); //send video data back to client to render front end
});

router.post("/videos/cues", (req, res) => {
  console.log("post cues to mongo");
});

router.delete("/videos/cues", (req, res) => {
  console.log("delete cue from mongo");
});

module.exports = router;
