const mongoCollection = require("./config/mongoCollection");
const cues = mongoCollection.cues;
const uuidv4 = require("uuid4");

async function addCue(videoId, newCue, time) {
  //insert a brand new cue if none exists.
  const cueModel = {
    _id: videoId,
    cues: [
      {
        id: uuidv4(),
        cue: newCue,
        time: time
      }
    ]
  };

  //model to add a cue to a video that already has cues
  const appendCue = {
    id: uuidv4(),
    cue: newCue,
    time: time
  };

  const cueCollection = await cues();
  const checkCueExists = getCue(videoId);
  if (checkCueExists) {
    checkCueExists.cue.push(appendCue);
    console.log("appended a cue: ", checkCueExists);
  } else {
    const addedCue = await cueCollection.insertOne(cueModel);
    if (addedCue.insertedCount === 0) throw "Could not create the task";
    const newId = addedCue.insertedId;
    console.log("no cue exists, inserting: ", getCue(newId));
  }

  //return await getCue(newId);
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
