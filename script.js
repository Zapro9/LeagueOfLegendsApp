//search.addEventListener("click", setInput);
$("#search").on("click", setInput);
function setInput() {
  console.log("clicedonsearchbutton");
}
var userInput = ``;
var sumNames = userInput
  .split(" joined the lobby")
  .map((name) => name.replace("\n", ""));

for (i = 0; i < 5; i++) {
  $.ajax({
    url: `http://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumNames[i]}?api_key=RGAPI-756f7b77-fee3-468c-a1ac-f8f8350973c9`,
    method: "GET",
  }).then(function (response) {
    var stats = `http://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${response.id}?api_key=RGAPI-756f7b77-fee3-468c-a1ac-f8f8350973c9`;

    $.ajax({
      url: stats,
      method: "GET",
    }).then(function (sumStats) {
      console.log(sumStats);
    });
  });
}
