const mongoCollection = require("./data/config/mongoCollection");
const cues = mongoCollection.cues;
async function reset() {
  let collection = await cues();
  collection.remove({}, function(err, result) {
    if (err) {
      console.log("error: ", err);
    }
    console.log("success");
  });
}

async function getAll() {
  let collection = await cues();
  console.log(await collection.find({}).toArray());
}

let obj = [
  { test: 1, cue: "test1" },
  { test: 2, cue: "test2" },
  { test: 3, cue: "test3" },
  { test: 4, cue: "test4" },
  { test: 5, cue: "test5" }
];

reset()