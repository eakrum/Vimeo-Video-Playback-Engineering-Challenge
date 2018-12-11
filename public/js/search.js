//make an api call to vimeo and render names
function submit() {
  var query = document.getElementById("searchField").value;

  //when you submit, just remove the list that was there before.
  var cardContainer = document.getElementById("card-container");
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  //send an AJAX request to the server to get data from VIMEO api.
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3000/search",
    data: { data: query },
    success: function(data) {
      renderNames(data);
    }
  });
}

//render 10 cards based on query
function renderNames(videos) {
  let cardContainer = document.getElementById("card-container");

  let newH2 = document.createElement("h2");

  let names = videos.map(videoNames => videoNames);
  //traverse through the response from server of video data
  for (let i = 0; i < names.length; i++) {
    let newDiv = document.createElement("div"); //create new html elements to render
    let newH2 = document.createElement("h2"); //create new html elements to render
    let videoId = names[i].uri.replace("/videos/", ""); //cut out the unnecessary information from URI; in this case it needs ID only.
    newH2.innerHTML = names[i].name; //display the name of the video
    newDiv.setAttribute("class", "card"); //set a css class to it for styling
    newDiv.setAttribute("id", videoId); //set the video id as an ID to the card
    newDiv.appendChild(newH2); //append the name to the card

    //when you click on a card its going to redirect you to a player page with specified video you searched for
    newDiv.onclick = function() {
      location.href = `player/${newDiv.getAttribute("id")}`;
    };
    cardContainer.appendChild(newDiv); //append a new card to the card container.
  }
}
