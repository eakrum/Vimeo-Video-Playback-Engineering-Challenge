const mongoCollection = require("./config/mongoCollection");
const cues = mongoCollection.cues;

async function addCue(videoId, newCue, time) {
  const cueModel = {
    _id: videoId,
    cue: newCue,
    time: time
  };
  const cueCollection = await cues();
  const addedCue = await cueCollection.insertOne(cueModel);
  if (addedCue.insertedCount === 0) throw "Could not create the task";
  const newId = addedCue.insertedId;
  return await getCue(newId);
}

async function getCue(id) {
  const cueCollection = await cues();
  const foundCue = await cueCollection.findOne({ _id: id });
  if (foundCue === null) throw "Task with that id could not be found";
  return foundCue;
}

module.exports = {
  addCue,
  getCue
};
