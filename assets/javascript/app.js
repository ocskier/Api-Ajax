var topics = ["Basketball","Baseball","Football","Hockey","Golf","Tennis","Swimming",
                "Nascar","Horse Racing","Soccer","Snow Skiing","Water Skiing","Surfing",
                "Kite Surfing","Fishing","Sailing","Badminton","Ping Pong"];



var newBtnGrp = $('<div class="btn-group btn-group-sm mybtngrp" role="group" aria-label="Basic example">');
var addNewBtnGrp = $('<div class="btn-group btn-group-sm myaddbtngrp" role="group" aria-label="Basic example">');

var middle = Math.floor(topics.length/2);
for (i=0; i <middle;i++) {
    newBtnGrp.append('<button type="button" class="btn btn-info topic-btn" style="font-size: 14px; margin: 2px 3px;" data-topic="'+topics[i]+'">'+topics[i]+'</button>');
}
newBtnGrp.append('<br>');
for (i=middle; i <topics.length;i++) {
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
$('#addbtn-container').append(addNewBtnGrp);

$(".mybtngrp").on("click",".topic-btn",function() {
    $("#gif-container").empty();
    var chosenTopic = $(this).attr("data-topic");
    queryGiphy(chosenTopic);
});

$(".myaddbtngrp").on("click",".topic-btn",function() {
    $("#gif-container").empty();
    var chosenTopic = $(this).attr("data-topic");
    queryGiphy(chosenTopic);
});

$("#searchBtn").on("click", function () {
    var newTopic = $('input').val(); 
    setTimeout(function() {    
        if (!(newTopic == "")&&!(lengthGifList==0)) {
            $("#gif-container").empty();
            queryGiphy(newTopic);
            var newBtn = $('<button type="button" class="btn btn-info topic-btn" style="font-size: 14px; margin: 2px 3px;" data-topic="'+newTopic+'">'+newTopic+'</button>');
            $(".myaddbtngrp").append(newBtn);
        }
        },1200);
    $('input').val("");
}); 

$("#clearBtn").on("click", function () {
    $("#gif-container").empty();
});

$("iframe").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});