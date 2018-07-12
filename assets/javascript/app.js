var topics = ["Basketball","Baseball","Football","Hockey","Golf","Tennis","Swimming",
                "Nascar","Horse Racing","Soccer","Snow Skiing","Water Skiing","Surfing",
                "Kite Surfing","Fishing","Sailing","Badminton","Ping Pong"];



var newBtnGrp = $('<div class="btn-group btn-group-sm mybtngrp" role="group" aria-label="Basic example">');
for (i=0; i <topics.length;i++) {
    newBtnGrp.append('<button type="button" class="btn btn-info topic-btn" style="font-size: 14px; margin: 2px 3px;" data-topic="'+topics[i]+'">'+topics[i]+'</button>');
}
var lengthGifList;

function queryGiphy (cat) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    cat + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
        console.log(response);
        console.log(response.data.length);
        lengthGifList=response.data.length;
        console.log(lengthGifList);
        for (i=0;i<response.data.length;i++){
            var newGifDiv = $('<div class="gif-card">');
            newGifDiv.append('<p>Rating: '+response.data[i].rating+'</p>');
            newGifDiv.append('<iframe src="'+response.data[i].embed_url+'" width="260" height="180" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>');
            $("#gif-container").append(newGifDiv);
        }
    });            
}

$('#btn-container').append(newBtnGrp);

$(".mybtngrp").on("click",".topic-btn",function() {
    $("#gif-container").empty();
    var chosenTopic = $(this).attr("data-topic");
    queryGiphy(chosenTopic);
});

$("#searchBtn").on("click", function () {
    var newTopic = $('input').val(); 
    queryGiphy(newTopic);
    setTimeout(function() {    
        if (!(newTopic == "")&&!(lengthGifList==0)) {
            var newBtn = $('<button type="button" class="btn btn-info topic-btn" style="font-size: 14px; margin: 2px 3px;" data-topic="'+newTopic+'">'+newTopic+'</button>');
            $(".mybtngrp").append(newBtn);
        }
        },1200);
    $('input').val("");
}); 

$("#clearBtn").on("click", function () {
    $("#gif-container").empty();
});
