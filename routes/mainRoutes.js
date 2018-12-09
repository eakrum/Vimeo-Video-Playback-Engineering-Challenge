const express = require("express");
const path = require("path");
const router = express.Router();
const { getVideos } = require("./vimeo/searchApi");
const { addCue, getCue } = require("../data/cue");

router.get("/", (req, res) => {
  res.render("vimeoFrontEnd/home");
});

router.get("/search", (req, res) => {
  res.render("vimeoFrontEnd/search");
});

router.get("/player/:id", async (req, res) => {
  let id = req.params.id;
  let src = `https://player.vimeo.com/video/${id}`;
  try {
    let cues = await getCue(id);
    console.log("this video has cues: ", cues);
    res.render("vimeoFrontEnd/player", {
      video: src
    });
  } catch (e) {
    console.log("no cues just render a blank one");
    res.render("vimeoFrontEnd/player", {
      video: src
    });
  }
});

router.post("/search", async (req, res) => {
  const query = req.body.data; //query received from client input
  const vimeoData = await getVideos(query); //response received from Vimeo API - wait for the promise to be fulfilled
  const videos = vimeoData.data; //video data
  res.send(videos); //send video data back to client to render front end
});

router.post("/videos/cues", async (req, res) => {
  const data = req.body;
  try {
    let newCue = await addCue(data.videoID, data.cue, data.time);
    res.status(200).send("success");
  } catch (e) {
    console.log(e);
  }
});

router.delete("/videos/cues", (req, res) => {
  console.log("delete cue from mongo");
});

// async function test() {
//   let getter = await getCue("163662857");
//   console.log(getter);
// }

// test();

module.exports = router;
