$("#burger").on("click", function (event) {
  $(".ul-container").toggle();
});
$(".navbar-item").on("click", function () {
  var href = $(this).attr("data-href");
  location.href = href;
});
$("#search").on("click", function () {
  var searchResults = $(".playerStats").css("display", "block");
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
      url: `http://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumNames[i]}?api_key=RGAPI-6620c470-48e8-4eca-99bc-91435755a984`,
      method: "GET",
    }).then(function (response) {
      var stats = `http://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${response.id}?api_key=RGAPI-6620c470-48e8-4eca-99bc-91435755a984`;
      $.ajax({
        url: stats,
        method: "GET",
      }).then(function (sumStats) {
        var finalStats = sumStats[0];
        var statDiv = $(`#player${count}Stats`);
        //
        var nameStat = $(
          "<div>" + "Name: " + finalStats.summonerName + "</div>"
        );
        statDiv.append(nameStat);
        //
        var rankStat = $(
          "<div>" +
            "Rank: " +
            finalStats.tier +
            " " +
            finalStats.rank +
            "</div>"
        );
        statDiv.append(rankStat);
        //
        var winStat = $("<div>" + "Wins: " + finalStats.wins + "</div>");
        statDiv.append(winStat);
        //
        var lossStat = $("<div>" + "Losses: " + finalStats.losses + "</div>");
        statDiv.append(lossStat);
        //
        var wlRatio = (finalStats.wins / finalStats.losses).toFixed(2);
        var wlStat = $("<div>" + "W/L Ratio: " + wlRatio + "</div>");
        statDiv.append(wlStat);
        //

        console.log(finalStats);
        count = count + 1;
      });
    });
  }
}
