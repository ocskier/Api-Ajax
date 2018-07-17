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
var tenorGifPos = 0;
var giphyGifPos = 0;

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
    btn.append('<img src="assets/images/favsymbol.jpg" class="img-fluid">');
    return btn;
}

function queryGiphy (cat) {

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    cat + "&api_key=dc6zaTOxFJmzC&limit=6&offset=" + giphyGifPos;

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
        console.log(response);
        lengthGifSearch=response.data.length;
        for (i=0;i<response.data.length;i++){
            giphyGifPos++;
            lengthGifList++;
            var newGifDiv = $('<div class="card gif-card" id="index-'+lengthGifList+'">');
            newGifDiv.append(makeFav());
            newGifDiv.append(makeBtn());
            newGifDiv.append('<img src="'+response.data[i].images.original.url+'" frameBorder="0" class = "card-img-top my-img" data-animate="'+response.data[i].images.original.url+'" data-still="'+response.data[i].images.original_still.url+'" data-state="animate" allowFullScreen></iframe>');
            var newGifCardBody = $('<div class="card-body mycardbody">'); 
            if (response.data[i].title==""){
                newGifCardBody.append('<p class="card-text myp">Untitled</p>');
            }
            else {
                newGifCardBody.append('<p class="card-text myp">'+response.data[i].title+'</p>');    
            }
            if (response.data[i].rating==""){
                newGifCardBody.append('<p class="card-text myp">Rating: NR</p>');
            }
            else {
                newGifCardBody.append('<p class="card-text myp">Rating: '+response.data[i].rating.toUpperCase()+'</p>');
            }
            newGifDiv.append(newGifCardBody);
            $("#gif-container").append(newGifDiv);
        }
    });            
}

// url Async requesting function
function httpGetAsync(theUrl, callback)
{
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}

// callback for the top 6 GIFs of search
function tenorCallback_search(responsetext)
{
    // parse the json response
    var response_objects = JSON.parse(responsetext);

    top_6_gifs = response_objects["results"];
    lengthGifSearch=lengthGifSearch+top_6_gifs.length;
    console.log(top_6_gifs);
    console.log(lengthGifSearch);
    for (i=0;i<top_6_gifs.length;i++){
        tenorGifPos++;
        lengthGifList++;
        var newGifDiv = $('<div class="card gif-card" id="index-'+lengthGifList+'">');
        newGifDiv.append(makeFav());
        newGifDiv.append(makeBtn());
        newGifDiv.append('<img src="'+top_6_gifs[i].media[0].gif.url+'" frameBorder="0" class = "card-img-top my-img" data-animate="'+top_6_gifs[i].media[0].gif.url+'" data-still="'+top_6_gifs[i].media[0].gif.preview+'" data-state="animate" allowFullScreen></iframe>');
        var newGifCardBody = $('<div class="card-body mycardbody">');
        if (top_6_gifs[i].title==""){
            newGifCardBody.append('<p class="card-text myp">Untitled</p>');
        }
        else {
            newGifCardBody.append('<p class="card-text myp">'+top_6_gifs[i].title+'</p>');
        }
        newGifCardBody.append('<p class="card-text myp">Rating: NR</p>');
        newGifDiv.append(newGifCardBody);
        $("#gif-container").append(newGifDiv);
    }

    return;

}

function callTenor (cat) {

    // set the apikey and limit
    var apikey = "TKE2YUWVIGXK";
    var lmt = 6;

    // test search term
    var search_term = cat;

    // using default locale of en_US
    var search_url = "https://api.tenor.com/v1/search?tag=" + search_term + "&key=" +
            apikey + "&limit=" + lmt + "&pos=" + tenorGifPos;
    console.log(tenorGifPos);

    httpGetAsync(search_url,tenorCallback_search);
}


$('#btn-container').append(newBtnGrp);
$('#addbtn-container').append(addNewBtnGrp);

$(".mybtngrp").on("click",".topic-btn",function() {
    
    var chosenTopic = $(this).attr("data-topic");
    queryGiphy(chosenTopic);
    callTenor(chosenTopic);
});

$(".myaddbtngrp").on("click",".topic-btn",function() {
    $("#gif-container").empty();
    var chosenTopic = $(this).attr("data-topic");
    queryGiphy(chosenTopic);
    callTenor(chosenTopic);
});

$("#searchBtn").on("click", function () {
    var newTopic = $('input').val(); 
    if (!(newTopic == "")) {
        queryGiphy(newTopic);
        callTenor(newTopic);
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
        $("#fav-container").prepend('<div class="row alert alert-primary" role="alert" style="background: lightgray;color: black;">Favorites</div>');
        $("#fav-container").attr("favs-activated","true");
    }
    var indexClicked = $(this).attr("data");
    this.remove();
    var copyCard = $("#index-"+indexClicked);
    $("#index-"+indexClicked).remove();
    $("#fav-gifs").append(copyCard);
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