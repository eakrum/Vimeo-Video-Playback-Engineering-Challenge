const mongoCollection = require("./config/mongoCollection");
const cues = mongoCollection.cues;
const uuidv4 = require("uuid4");

//this function will check if a cue exists or not and add a new Model if it does not
async function existsCue(data) {
  const cueCollection = await cues();
  const foundCue = await cueCollection.findOne({ _id: data.videoId });
  if (foundCue === null) {
    const brandNewCue = await addCue(data.videoID, data.cue, data.time);
    return brandNewCue;
  }
}

//this is a helper function that will add a new cue to the database - based on the model
async function addCue(videoId, newCue, time) {
  //basic model of a cues per video.
  const cueModel = {
    _id: videoId,
    cues: [
      {
        cueId: uuidv4(), //generate a unique Id for each cue - so we can delete them later!
        cue: newCue,
        time: time
      }
    ]
  };

  const cueCollection = await cues(); //make a reference to the cue collection
  const addedCue = await cueCollection.insertOne(cueModel); //insert a brand new cue model to the database
  if (addedCue.insertedCount === 0) throw "Could not create the cue"; //throw an error
  let newId = addedCue.insertedId; //get the id of the newly inserted cue
  return await returnCue(newId); //use this helper function to return the cue we just inserted.
}

//this function will APPEND new cues to a pre-existing cue model.
async function appendCue(videoID, newCue, time) {
  //this is the basic model of a cue we should append
  const appendModel = {
    cueId: uuidv4(),
    cue: newCue,
    time: time
  };
  const cueData = await returnCue(videoID); //this will get the cue data based on videoId (the primary key)
  const appendedCue = cueData.cues.push(appendModel); //this will push a new object onto the array of objects found in key "cues"
  console.log(cueData);
  const cueCollection = await cues(); //make a reference to the collection

  //UPDATE the cue model in mongo with the data that was adjusted to it above!
  const updatedCue = await cueCollection.updateOne(
    { _id: videoID },
    { $set: cueData }
  );
  if (updatedCue.insertedCount === 0) console.log("Could not update the cue");
  //throw an err
  else if (updatedCue.modifiedCount === 1) return cueData; //return the cue
}

//this function returns an entire cue model based on its videoId (primary key)
async function returnCue(id) {
  const cueCollection = await cues();
  const foundCue = await cueCollection.findOne({ _id: id }); //mongo query to get the cue
  if (foundCue === null) {
    throw "could not find that cue"; //throw an err
  }
  return foundCue; //return said cue
}

//this function will delete a cue based on its videoId and cueId!
async function deleteCue(videoId, cueId) {
  const cueCollection = await cues(); //make a reference to the collection

  const document = await returnCue(videoId); //get the appropriate cue document

  let newCueData;
  let allCues = document.cues;
  for (let i = 0; i <= allCues.length - 1; i++) {
    if (allCues[i].cueId === cueId) {
      let removeable = allCues[i];
      newCueData = allCues.filter(item => item !== removeable);
      break;
    }
  }

  const updatedCue = await cueCollection.updateOne(
    { _id: videoId },
    { $set: {"cues": newCueData} }
  );
  if (updatedCue.modifiedCount === 0) console.log("Could not update the cue");
  //throw an err
  else if (updatedCue.modifiedCount === 1) return newCueData; //return the cue
}

module.exports = {
  addCue,
  existsCue,
  appendCue,
  returnCue,
  deleteCue
};
