function submit() {
  var query = document.getElementById("searchField").value;
  console.log("query: ", query);

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3000/search",
    data: { data: query },
    success: function(d) {
      alert(d);
      console.log("response: ", d);
    }
  });
}
