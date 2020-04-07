var userInput = `Stellarplayss joined the lobby
DxS 69 joined the lobby
winterbsck joined the lobby
larplife32 joined the lobby
PATIENCE AATROX joined the lobby`;
var sumNames = userInput
  .split(" joined the lobby")
  .map((name) => name.replace("\n", ""));

for (i = 0; i < 5; i++) {
  $.ajax({
    url: `http://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumNames[i]}?api_key=RGAPI-86405a22-f985-4b60-8ec8-b1b47b02675c`,
    method: "GET",
  }).then(function (response) {
    var stats = `http://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${response.id}?api_key=RGAPI-86405a22-f985-4b60-8ec8-b1b47b02675c`;

    $.ajax({
      url: stats,
      method: "GET",
    }).then(function (sumStats) {
      console.log(sumStats);
    });
  });
}
