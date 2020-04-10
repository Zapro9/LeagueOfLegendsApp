$(".navbar-item").on("click", function () {
    var href = $(this).attr("data-href");
    location.href = href;
  });

var userInput = ``;
var summonerNameArr = [];
var winsArr = [];
var lossesArr = [];

//click event 
$("#bubbleButton").click(function(){
  event.preventDefault();
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
        method: "GET"
      }).then(function(responseTwo) {  
        var allResponses = responseTwo[0];
        console.log(allResponses);
        summonerNameArr.push(allResponses.summonerName);
        winsArr.push(allResponses.wins);
        lossesArr.push(allResponses.losses);
        makeChart();

      })})}});

function makeChart(){
var ctx = document.getElementById('bubbleChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bubble',
    data: {
      datasets: [
        {
        label: summonerNameArr[0],
        data: [{x: winsArr[0], y: lossesArr[0], r: 6}],
        backgroundColor: "#DEA8F5",
        hoverBackgroundColor: "#DEA8F5"
      },
      {
        label: summonerNameArr[1],
          data: [{x: winsArr[1], y: lossesArr[1], r: 6}],
          backgroundColor:"#77e59b",
          hoverBackgroundColor: "#77e59b"
      },
      {
        label: summonerNameArr[2],
          data: [{x: winsArr[2], y: lossesArr[2], r: 6}],
          backgroundColor:"#fa9e92",
          hoverBackgroundColor: "#fa9e92"
      },
      {
        label: summonerNameArr[3],
          data: [{x: winsArr[3], y: lossesArr[3], r: 6}],
          backgroundColor:"#8bddee",
          hoverBackgroundColor: "#8bddee"
      },
      {
        label: summonerNameArr[4],
          data: [{x: winsArr[4], y: lossesArr[4], r: 6}],
          backgroundColor:"#a5a2f7",
          hoverBackgroundColor: "#a5a2f7"
      }
      ]
  }
    })}