$("#burger").on("click", function (event) {
  $(".ul-container").toggle();
});
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
  var count = 0;
  for (i = 0; i < sumNames.length; i++) {
    $.ajax({
      url: `http://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumNames[i]}?api_key=RGAPI-6b44e200-9831-4e0d-969d-833d6a11ba8b`,
      method: "GET",
    }).then(function (response) {
      var stats = `http://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${response.id}?api_key=RGAPI-6b44e200-9831-4e0d-969d-833d6a11ba8b`;
      console.log(response);
      $.ajax({
        url: stats,
        method: "GET",
      }).then(function (sumStats) {
        var finalStats = sumStats[0];
        console.log(i);
        var statDiv = $(`#player${count}Stats`);
        console.log(statDiv);
        var newStatDiv = $("<div>" + finalStats.tier + "</div>");
        statDiv.append(newStatDiv);
        console.log(finalStats);

        count = count + 1;
      });
    });
  }
}
// use variable [i] to target a player and select the correct div
