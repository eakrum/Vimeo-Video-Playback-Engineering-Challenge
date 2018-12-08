function submit() {
  var query = document.getElementById("searchField").value;
  console.log("query: ", query);
  var cardContainer = document.getElementById("card-container");
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3000/search",
    data: { data: query },
    success: function(data) {
      console.log("response: ", data);
      renderNames(data);
    }
  });
}

function renderNames(videos) {
  let cardContainer = document.getElementById("card-container");

  let newH2 = document.createElement("h2");

  let names = videos.map(videoNames => videoNames.name);
  for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
    let newDiv = document.createElement("div");
    let newH2 = document.createElement("h2");
    newH2.innerHTML = names[i];
    newDiv.setAttribute("class", "card");
    let card = newDiv.appendChild(newH2);
    cardContainer.appendChild(newDiv);
  }
}
