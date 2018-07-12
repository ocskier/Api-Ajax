var topics = ["Basketball","Baseball","Football","Hockey","Golf","Tennis","Swimming",
                "Nascar","Horse Racing","Soccer","Snow Skiing","Water Skiing","Surfing",
                "Kite Surfing","Fishing","Sailing","Badminton","Ping Pong"];



var newBtnGrp = $('<div class="btn-group btn-group-sm mybtngrp" role="group" aria-label="Basic example">');
for (i=0; i <topics.length;i++) {
    newBtnGrp.append('<button type="button" class="btn btn-info topic-btn" style="font-size: 14px; margin: 2px 3px;" data-topic="'+topics[i]+'">'+topics[i]+'</button>');
}
$('#btn-container').append(newBtnGrp);

$(".topic-btn").on("click",function() {
    var chosenTopic = $(this).attr("data-topic");
    var searchGiphy = function(sport) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        sport + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
        console.log(response);
        for (i=0;i<response.data.length;i++){
        console.log(response.data[i].embed_url);
            var newGifDiv = $('<div class="gif-card">');
            newGifDiv.append('<p>Rating: '+response.data[i].rating+'</p>');
            newGifDiv.append('<iframe src="'+response.data[i].embed_url+'" width="260" height="180" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>');
            $("#gif-container").append(newGifDiv);
        }
        });
    };
    searchGiphy(chosenTopic);
});

$(".submit-btn").on("click",function() {
    var chosenTopic = $("#add-sport").target.value;
    console.log(chosenTopic);
});

