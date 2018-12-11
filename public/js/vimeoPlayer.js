//GLOBAL VARIABLES TO USE FOR LISTENERS AND OTHER DATA MANIPULATION
const iframe = document.querySelector("iframe");
const player = new Vimeo.Player(iframe);
const src = document.querySelector("iframe").getAttribute("src"); //get video URI
const videoId = src.replace("https://player.vimeo.com/video/", ""); //get video ID without making an API call
const table = document.getElementsByTagName("table")[0]; //make a reference to the table element
let tbody = table.getElementsByTagName("tbody")[0]; //make a reference to the table body
let rows = table.rows;
let totalData = [];

/*********************************************************************************************************************************
 *                                          RENDERING FOR FRONT END FUNCTIONS
 *
 *********************************************************************************************************************************/

/******************This function will render the front end with a new "cue" when button "Add Cue" is pressed**********************/
function renderNewCue(cue, time, id) {
  // Create an empty <tr> element and add it to the 1st position of the table:
  let row = table.insertRow(1);
  row.setAttribute("id", id);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);

  // Add some text to the new cells:
  cell1.innerHTML = cue;
  cell1.setAttribute("class", "cue");
  cell2.innerHTML = time;
  cell1.setAttribute("class", "id");
  cell3.innerHTML = id;
  cell1.setAttribute("class", "id");
  getTableData();
}

/***************************This function displays the cue as an overlay***************************/
function displayCue(text) {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("new_cue").innerHTML = text;
  getTableData(); //update table data
}

//delete a cue
function deleteCueFromTable(id) {
  let row = document.getElementById(id);
  row.parentNode.removeChild(row);
  getTableData(); //update table data
}

/*********************************************************************************************************************************************
 *                                                     SENDING DATA TO API ROUTES
 *
 ********************************************************************************************************************************************/

/**********This function will POST to our server to update the Database, then render the front end with the new cue!*********************/
function submitCue() {
  const cueObj = {}; //create an object to hold cue data
  const cue = document.getElementById("input-cue").value; //get the value of the cue submitted

  //as per API, this will get the time of the video, then in the promise, post to the server
  player
    .getCurrentTime()
    .then(function(seconds) {
      //round seconds to nearest whole number
      let roundedTime = Math.round(seconds);
      cueObj["videoID"] = videoId;
      cueObj["cue"] = cue;
      cueObj["time"] = roundedTime;

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
        deleteCueFromTable(cueId);
      }
    });
  }
};

/****************************************************************************
 *                            EVENT LISTENERS
 *
 ****************************************************************************/

//listen to time
player.on("timeupdate", function(data) {
  //loop through all cues available
  for (let i = 0; i < totalData.length; i++) {
    let cue = totalData[i].cue;
    let cueTime = parseFloat(totalData[i].time);
    if (cueTime <= data.seconds && cueTime + 3 >= data.seconds) {
      console.log("success!!");
      displayCue(cue);
      break;
    } else {
      document.getElementById("overlay").style.display = "none";
      document.getElementById("new_cue").innerHTML = "";
    }
  }
});

//video Changer
function videoChanger() {
  let videoId = document.getElementById("video-changer").value;
  let route = `/player/${videoId}`;
  location.href = route;
}

/********************************************************************************************
 *                            INITIALIZE PAGE WITH CUE DATA
 *
 *********************************************************************************************/
function getTableData() {
  let tableData = [];

  let table = document.getElementsByTagName("table")[0]; //make a reference to the table element

  // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
  for (i = 1; i < table.rows.length; i++) {
    // GET THE CELLS COLLECTION OF THE CURRENT ROW.
    var objCells = table.rows.item(i).cells;
    let obj = {};

    // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
    for (var j = 0; j < objCells.length; j++) {
      obj[objCells[j].getAttribute("class")] = objCells[j].innerHTML;
    }

    tableData.push(obj);
  }
  totalData = tableData;
}

//itialize the page with cue data
getTableData();
