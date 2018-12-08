const express = require("express");
const path = require("path");
const router = express.Router();

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

router.post("/search", (req, res) => {
  const query = req.body.data;
  console.log(query);
  console.log("posted a video search to server");
  res.send(query);
});

router.post("/videos/cues", (req, res) => {
  console.log("post cues to mongo");
});

router.delete("/videos/cues", (req, res) => {
  console.log("delete cue from mongo");
});

module.exports = router;
