function videoChanger() {
  let videoId = document.getElementById("video-changer").value;
  let route = `/player/${videoId}`;
  location.href = route;
}

function getVimeoPlayer() {
  var iframe = document.querySelector("iframe");
  var player = new Vimeo.Player(iframe);
  return player;
}

//might need this later
function getCurrentTime() {
  const player = getVimeoPlayer();
  console.log("in time");

  player.on("timeupdate", function(data) {
    let time = data.seconds;
    console.log("time: ", time);
  });
}

function submitCue() {
  const cueObj = {};
  const player = getVimeoPlayer();
  const cue = document.getElementById("input-cue").value;
  const src = document.querySelector("iframe").getAttribute("src"); //get video URI
  const videoId = src.replace("https://player.vimeo.com/video/", ""); //get video ID without making an API call
  console.log(videoId);

  let time = player
    .getCurrentTime()
    .then(function(seconds) {
      // seconds = the current playback position
      cueObj["videoID"] = videoId;
      cueObj["cue"] = cue;
      cueObj["time"] = seconds;
      console.log(cueObj);
      //send an AJAX request to the server to get data from VIMEO api.
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/videos/cues",
        data: cueObj,
        success: function(data) {
          console.log("successfully sent to server");
        }
      });
    })
    .catch(function(error) {
      // an error occurred
      throw error;
    });
}
