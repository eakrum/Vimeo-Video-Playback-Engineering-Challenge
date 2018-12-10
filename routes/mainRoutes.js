const express = require("express");
const path = require("path");
const router = express.Router();
const { getVideos } = require("./vimeo/searchApi");
const {
  addCue,
  existsCue,
  returnCue,
  appendCue,
  deleteCue
} = require("../data/cue");

router.get("/", (req, res) => {
  res.render("vimeoFrontEnd/home");
});

router.get("/search", (req, res) => {
  res.render("vimeoFrontEnd/search");
});

router.get("/player/:id", async (req, res) => {
  let id = req.params.id;
  let src = `https://player.vimeo.com/video/${id}`;
  //check if the video has cues
  try {
    let cueData = await returnCue(id);
    console.log("this video has cues: ", cueData.cues);
    res.render("vimeoFrontEnd/player", {
      video: src,
      cues: cueData.cues
    });

    //no cues on video
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
  const data = req.body; //cue data
  try {
    const cueExists = await existsCue(data);
    res.status(200).send(cueExists.cues);
  } catch (e) {
    //append cues
    console.log("append logic");
    const appendedCue = await appendCue(data.videoID, data.cue, data.time);
    console.log("success appended: ", appendedCue);
    res.status(200).send(appendedCue);
  }
});

router.delete("/videos/cues", async (req, res) => {
  const data = req.body;
  console.log("delete cue from mongo");
  let updatedAfterDelete = await deleteCue(data.videoId, data.cueId);
  res.status(200).send(updatedAfterDelete);
});

module.exports = router;
