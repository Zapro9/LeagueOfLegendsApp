$(".navbar-item").on("click", function () {
  var href = $(this).attr("data-href");
  location.href = href;
});
var userInput = ``;
$("#search").on("click", setInput);
function setInput() {
  userInput = $("#summText").val().trim();

  var sumNames = userInput
    .split(" joined the lobby")
    .map((name) => name.replace("\n", ""));

  for (i = 0; i < 5; i++) {
    $.ajax({
      url: `http://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumNames[i]}?api_key=RGAPI-6b44e200-9831-4e0d-969d-833d6a11ba8b`,
      method: "GET",
    }).then(function (response) {
      var stats = `http://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${response.id}?api_key=RGAPI-6b44e200-9831-4e0d-969d-833d6a11ba8b`;

      $.ajax({
        url: stats,
        method: "GET",
      }).then(function (sumStats) {
        console.log(sumStats);
      });
    });
  }
}
