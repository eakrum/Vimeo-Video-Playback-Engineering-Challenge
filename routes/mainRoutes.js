const express = require("express");
const path = require("path");
const router = express.Router();

router.use(express.static("public"));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/", "home.html"));
});

router.get("/search", (req, res) => {
  console.log("get video search screen");
});

router.get("/player", (req, res) => {
  console.log("get video player screen");
});

router.get("/player/:id", (req, res) => {
  console.log("get player with video ID and display");
});

router.post("/videos/cues", (req, res) => {
  console.log("post cues to mongo");
});

router.delete("/videos/cues", (req, res) => {
  console.log("delete cue from mongo");
});

module.exports = router;
