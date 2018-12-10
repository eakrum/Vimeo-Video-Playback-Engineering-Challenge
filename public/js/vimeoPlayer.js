const iframe = document.querySelector("iframe");
const player = new Vimeo.Player(iframe);
const src = document.querySelector("iframe").getAttribute("src"); //get video URI
const videoId = src.replace("https://player.vimeo.com/video/", ""); //get video ID without making an API call
let table = document.getElementsByTagName("table")[0]; //make a reference to the table element
let tbody = table.getElementsByTagName("tbody")[0]; //make a reference to the table body
let rows = table.rows;

let cues = [];
function getTableData() {
  for (var i = 0; i < rows.length; i++) {
    var rowText = rows[i].firstChild.textContent;
    if (rowText.indexOf("@")) {
      // If the content of the row contains a '@' character (This could be replaced with a regex check)
      // Also, I personally prefer to use '~' over '> -1' for indexOf(), but both would work.
      cues.push(rowText);
    }
  }
  console.log(cues);
}




//This function will POST to our server to update the Database, then render the front end with the new cue!
function submitCue() {
  const cueObj = {}; //create an object to hold cue data

  const cue = document.getElementById("input-cue").value; //get the value of the cue submitted

  //as per API, this will get the time of the video, then in the promise, post to the server
  player
    .getCurrentTime()
    .then(function(seconds) {
      //round seconds to nearest whole number
      let roundedTime = Math.round(seconds);
      // seconds = the current playback position
      cueObj["videoID"] = videoId;
      cueObj["cue"] = cue;
      cueObj["time"] = roundedTime;
      console.log(cueObj);

      //send an AJAX request to the server to POST data and update MongoDB!.
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/videos/cues",
        data: cueObj,
        success: function(data) {
          let addedCue = data.cues.pop();

          renderNewCue(addedCue.cue, addedCue.time, addedCue.cueId); //if the post to server was successful, render the new cue
        }
      });
    })
    .catch(function(error) {
      // an error occurred
      throw error;
    });
}

//This function will render the front end with a new "cue" when button "Add Cue" is pressed
function renderNewCue(cue, time, id) {
  // Find a <table> element with id="myTable":
  let table = document.getElementById("cueTable");

  // Create an empty <tr> element and add it to the 1st position of the table:
  let row = table.insertRow(1);
  row.setAttribute("id", id);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);

  // Add some text to the new cells:
  cell1.innerHTML = cue;
  cell2.innerHTML = time;
  cell3.innerHTML = id;
}

//display a cue
function displayCue(text, time) {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("cue_text").innerHTML = text;
}

function deleteCueFromTable(id) {
  let row = document.getElementById(id);
  row.parentNode.removeChild(row);
}

//listen to deleting a cue, then send request to server
tbody.onclick = function(e) {
  e = e || window.event;
  var data = [];
  var target = e.srcElement || e.target;
  while (target && target.nodeName !== "TR") {
    target = target.parentNode;
  }
  if (target) {
    var cells = target.getElementsByTagName("td");
    let cueId = cells[2].innerHTML;
    console.log(cueId);
    $.ajax({
      type: "DELETE",
      url: "http://127.0.0.1:3000/videos/cues",
      data: { videoId: videoId, cueId: cueId },
      success: function(data) {
        console.log("data!!", data);
        deleteCueFromTable(cueId);
      }
    });
  }
};

//listen to time
player.on("timeupdate", function(data) {
  //console.log(data.seconds);
  if (12 <= data.seconds && 12 + 5 >= data.seconds) {
    displayCue("test", 24);
  }
});

first();
