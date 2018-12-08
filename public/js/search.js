function submit() {
  var query = document.getElementById("searchField").value;
  console.log("query: ", query);

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
  let names = videos.map(videoNames => videoNames.name);
  console.log(names);
}
