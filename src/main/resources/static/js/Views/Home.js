import * as KEYS from "../keys.js";
import createView from "../createView.js";


var map;

var geojson = {
    type: 'FeatureCollection',
    features: []
};


export default function Home() {
    return `  
    <div class="container">
        <div class="row">
        <div class="col-md-8">
            <div id="recipe"></div>
            <button id="prevspoon" class="d-none">Previous</button>
            <button id="morespoon" class="d-none">More</button>
            </div>
            <div class="col-md-4">
                <div class="d-flex justify-content-center flex-wrap">
                    <div id="youtubeBox" class="d-flex justify-content-center flex-wrap"></div> 
                    <br>
                    <button id="prevbtn" class="d-none">Previous</button> 
                    <button id="morebtn" class="d-none" >More videos</button>
                    <br>
                    <div id="google_house"></div>
                    <div id="map" style="width: 300px; height: 250px;"></div>
                </div>
            </div>
        </div>
    </div>
         `
}

export function homeEvents() {
    searchClick();

}

function searchClick() {
    $("#submit").click(function () {
        let q = $("#inputMain").val()
        // console.log(q);
        getLocations(q);
        // searchRecipes();
        getVideos(q)
        mapBox()

    })
}

// YOUTUBE FUNCTIONS // YOUTUBE FUNCTIONS // YOUTUBE FUNCTIONS // YOUTUBE FUNCTIONS // YOUTUBE FUNCTIONS // BELOW
var nextPageToken = ""
var prevPageToken = ""

function getVideos(q) {
    $.ajax({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: KEYS.returnGoogleKey(),
            q: `${q} recipes`,
            part: 'snippet',
            maxResults: 2,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function (data) {
            // console.log(data)
            nextPageToken = data.nextPageToken
            // getNextVideo(q, data.nextPageToken)
            embedData(data);
            $("#morebtn").toggleClass('d-none')
            $("#prevbtn").toggleClass('d-none')
            addYoutubePagination(q);

        },
        error: function (response) {
            console.log("Request Failed");
            console.log(response)
        }
    });
}
function getNextVideo(q, pageToken) {
    $.ajax({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: KEYS.returnGoogleKey(),
            q: `${q} recipes`,
            part: 'snippet',
            maxResults: 2,
            type: 'video',
            videoEmbeddable: true,
            pageToken: pageToken
        },
        success: function (data) {
            prevPageToken = data.prevPageToken
            nextPageToken = data.nextPageToken
            embedData(data);
        },
        error: function (response) {
            console.log("Request Failed");
            console.log(response)
        }
    });
}


function embedData(data) {
    $("#youtubeBox").html("");
    let dataArr = data.items
    dataArr.forEach(function (video) {
        $("#youtubeBox").append(`
            <iframe class="videoBox col-auto" src="https://www.youtube.com/embed/${video.id.videoId}" title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>`)

    })
}
function addYoutubePagination(q){
    $("#morebtn").click(function(){
        getNextVideo(q, nextPageToken);

    })
    $("#prevbtn").click(function(){
        getNextVideo(q, prevPageToken);

    })
}

function getLocations(q) {
    $.ajax({
        method: "GET",
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=29.4241%2C-98.4936&radius=3000&key=${KEYS.returnGoogleKey()}&type=restaurant&keyword=${q}`,
        success: function (data) {
            console.log(data);
            console.log("locations")
            combLocation(data);
        }
    })
}


function mapBox() {
    mapboxgl.accessToken = KEYS.returnMapboxKey();
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-98.4936, 29.4241], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });

}

function createMarkers() {
// add markers to map
    for (const {geometry, properties} of geojson.features) {
// create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';

// make a marker for each feature and add it to the map
        new mapboxgl.Marker()
            .setLngLat(geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({offset: 10}) // add popups
                    .setHTML(
                        `<form class="popup-form"> 
                        <p class="restaurantName">${properties.title}</p> 
                        <br>
                          <p class="vicinity">${properties.description}</p> 
                        <button type="button" class="restaurantSave">Save</button> 
                        </form>`
                    )
            )
            .addTo(map);
        console.log("pop up added to map")
    }

}

function setSaveEvent(){
    console.log("setting save events")

    $('#map').on("click", ".mapboxgl-popup .mapboxgl-popup-content .popup-form .restaurantSave", function (){
        console.log($(this).siblings(".restaurantName").text())
        let restaurantName = $(this).siblings(".restaurantName").text()
        let vicinity = $(this).siblings(".vicinity").text()

        let savedRestaurants = {
            "name": restaurantName,
            "vicinity" : vicinity
        }

        console.log(savedRestaurants)

        let request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(savedRestaurants)
        };

        fetch("http://localhost:8080/api/restaurants", request)
            .then((response) => {
                console.log(response.status)
                createView("/");
            });
    })
}

function combLocation(data) {

    let test = data.results.map(function (result) {
        let lng = result.geometry.location.lng;
        let lat = result.geometry.location.lat;
        geojson.features.unshift({
            type: 'Feature',
            geometry: {type: 'Point', coordinates: [lng, lat]},
            properties: {title: `${result.name}`, description: `${result.vicinity}`}
        })
        // console.log(data)


    });
    createMarkers();
    setSaveEvent();
}


//first snippet of us-3 (copy/pasted)
// first call to spoontacular -> returns vague list of recipes with IDs
var offset = 0;
var globalQ = "";

function searchRecipes(q) {
    globalQ = q;
    $.ajax({
        method: "GET",
        url: `https://api.spoonacular.com/recipes/complexSearch`,
        data: {
            apiKey : KEYS.returnSpoonKey(),
            query : q,
            offset: 0,
            number: 10,
        },
        success: function (data) {
            console.log(data);
            // ingredientsCall(data)
            embedFoodAnchors(data)
            addSpoonPagination(q)
        }
    })
}
function nextSpoonCall(q, offset) {
    $.ajax({
        method: "GET",
        url: `https://api.spoonacular.com/recipes/complexSearch`,
        data: {
            apiKey : KEYS.returnSpoonKey(),
            query : q,
            offset: offset,
            number: 10,
        },
        success: function (data) {
            // console.log(data);
            // ingredientsCall(data)
            embedFoodAnchors(data)
        }
    })
}

function embedFoodAnchors(data){

    $("#recipe").html("");
    data.results.forEach(function(result){
        let el = $(`<a class='clickAnchor' data-id='${result.id}'>${result.title}</a>`)
        console.log(el);
        $("#recipe").append(el);
        $("#recipe").append("<br>")
        el.click(function(){
            clickFoodAnchor(result)
        })


    })

}
function clickFoodAnchor(result){
    ingredientsCall(result)
}
function addSpoonPagination(q){
    $("#prevspoon").toggleClass('d-none');
    $("#morespoon").toggleClass('d-none');
    $("#prevspoon").click(function(){
        if (offset !== 0){
            offset -= 10;
        } else{
            return;
        }
        // console.log(offset)
        nextSpoonCall(q, offset);
    })
    $("#morespoon").click(function(){
        offset += 10;
        nextSpoonCall(q, offset)
    })
}
function returnIngredients(data) {
    return data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join("");
}


function ingredientsCall(result) {
    if ($("#prevspoon").hasClass('d-none')){
        $("#prevspoon").toggleClass('d-none');
    }
    if ($("#morespoon").hasClass('d-none')) {
        $("#morespoon").toggleClass('d-none');
    }

    $.ajax({
        method: "GET",
        url: `https://api.spoonacular.com/recipes/${result.id}/information?apiKey=${KEYS.returnSpoonKey()}&includeNutrition=true`,
        success: function (data) {
            console.log(data);
            $("#recipe").html(`<button id="backbutton">Back</button> <br>${data.title}<br> <ul>${returnIngredients(data)}</ul>${data.instructions}`)
            $("#backbutton").click(function(){
                nextSpoonCall(globalQ, offset)
            })
        }
    })

}