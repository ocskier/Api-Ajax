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

var lengthGifSearch;
var lengthGifList=0;

function makeBtn () {
    var btn = $("<button></button>");
    btn.attr("id","index-"+lengthGifList+'"');
    btn.attr("data", lengthGifList);
    btn.attr("class","checkbox");
    btn.text("X");
    return btn;
}
function makeFav () {
    var btn = $("<button></button>");
    btn.attr("id","index-"+lengthGifList+'"');
    btn.attr("data", lengthGifList);
    btn.attr("class","favorite");
    btn.append('<img src="assets/images/favsymbol.jpg">');
    return btn;
}

function queryGiphy (cat) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    cat + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
        console.log(response);
        lengthGifSearch=response.data.length;
        for (i=0;i<response.data.length;i++){
            lengthGifList++;
            var newGifDiv = $('<div class="gif-card" id="index-'+lengthGifList+'">');
            newGifDiv.append(makeFav());
            newGifDiv.append(makeBtn());
            newGifDiv.append('<img src="'+response.data[i].images.original.url+'" width="270" height="200" frameBorder="0" class = "my-img" data-animate="'+response.data[i].images.original.url+'" data-still="'+response.data[i].images.original_still.url+'" data-state="animate" allowFullScreen></iframe>');
            newGifDiv.append('<p>'+response.data[i].title+'</p>');
            newGifDiv.append('<p>Rating: '+response.data[i].rating+'</p>');
            $("#gif-container").append(newGifDiv);
        }
    });            
}

$('#btn-container').append(newBtnGrp);
$('#addbtn-container').append(addNewBtnGrp);

$(".mybtngrp").on("click",".topic-btn",function() {
    
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
    if (!(newTopic == "")) {
        queryGiphy(newTopic);
        setTimeout(function() { 
            if (!(lengthGifSearch===0)) {
                var newBtn = $('<button type="button" class="btn btn-info topic-btn" style="font-size: 14px; margin: 2px 3px;" data-topic="'+newTopic+'">'+newTopic+'</button>');
                $(".myaddbtngrp").append(newBtn);
            }
        },2500);
    }
    $('input').val("");
}); 

$(".gif-class").on("click", ".checkbox", function () {
    var indexClicked = $(this).attr("data");
    $("#index-"+indexClicked).remove();
});

$(".gif-class").on("click", ".favorite", function () {
    var isFavsActivated = $("#fav-container").attr("favs-activated"); 
    if (isFavsActivated == "false") {
        $("#fav-container").append('<h2 style="color: black;">Favorites</h2>');
        $("#fav-container").attr("favs-activated","true");
    }
    var indexClicked = $(this).attr("data");
    this.remove();
    var copyCard = $("#index-"+indexClicked);
    $("#index-"+indexClicked).remove();
    $("#fav-container").append(copyCard);
});

$("#clearBtn").on("click", function () {
    $("#gif-container").empty();
});

$(".gif-class").on("click",".my-img",function() {

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