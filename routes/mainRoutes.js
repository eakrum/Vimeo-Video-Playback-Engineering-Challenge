const express = require("express");
const path = require("path");
const router = express.Router();
const { searchVimeo } = require("./vimeo/searchApi");
const {
  addCue,
  existsCue,
  returnCue,
  appendCue,
  deleteCue
} = require("../data/cue");

/*********************************************************************************************************************************
 *                                          GET REQUESTS
 *
 *********************************************************************************************************************************/

//HOME SCREEN
router.get("/", (req, res) => {
  res.render("vimeoFrontEnd/home");
});

//SEARCH SCREEN
router.get("/search", (req, res) => {
  res.render("vimeoFrontEnd/search");
});

//PLAYER SCREEN - PARAMS: videoId
router.get("/player/:id", async (req, res) => {
  let id = req.params.id;
  let src = `https://player.vimeo.com/video/${id}`; //video src to inject into iframe
  //check if the video has cues
  try {
    //get cue data and then render
    let cueData = await returnCue(id);
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
/*********************************************************************************************************************************
 *                                         POST REQUESTS
 *
 *********************************************************************************************************************************/

//this is a specific endpoint that checks the vimeo api for top 10 videos based on relevance - then sends videos back to client to render
router.post("/search", async (req, res) => {
  console.log("post search");
  const query = req.body.data; //query received from client input
  const vimeoData = await searchVimeo(query); //response received from Vimeo API - wait for the promise to be fulfilled
  const videos = vimeoData.data; //video data
  res.send(videos); //send video data back to client to render front end
});

//this is a specific endpoint to adds cues to a video
router.post("/videos/cues", async (req, res) => {
  const data = req.body; //cue data
  try {
    const cueExists = await existsCue(data);
    res.status(200).send(cueExists.cues);
  } catch (e) {
    //append cues
    const appendedCue = await appendCue(data.videoID, data.cue, data.time);
    res.status(200).send(appendedCue);
  }
});

//this is a specific endpoint to delete cues from a video
router.delete("/videos/cues", async (req, res) => {
  const data = req.body;
  console.log("delete cue from mongo");
  let updatedAfterDelete = await deleteCue(data.videoId, data.cueId);
  res.status(200).send(updatedAfterDelete);
});

module.exports = router;
