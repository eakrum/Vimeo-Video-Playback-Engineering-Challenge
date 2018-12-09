const express = require("express");
const path = require("path");
const router = express.Router();
const { getVideos } = require("./vimeo/searchApi");

router.get("/", (req, res) => {
  res.render("vimeoFrontEnd/home");
});

router.get("/search", (req, res) => {
  res.render("vimeoFrontEnd/search");

  console.log("get video search screen");
});

router.get("/player/:id", (req, res) => {
  let id = req.params.id;
  let src = `https://player.vimeo.com/video/${id}`;
  console.log("got a player with id: ", id);
  res.render("vimeoFrontEnd/player", {
    video: src
  });
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
