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
    saveRecipe();
}

function searchClick() {
    $("#submit").click(function () {
        let q = $("#inputMain").val()
        console.log(q);
        getLocations(q);
        // searchRecipes();
        getVideos(q)
        mapBox()
        searchRecipes(q)
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
            q: `${q} recipe`,
            part: 'snippet',
            maxResults: 2,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function (data) {
            console.log(data)
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
            q: `${q} recipe`,
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
                allowfullscreen></iframe><button id="savevid">Add to Favorites</button>`)
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

//Mapbox Functions//Mapbox Functions//Mapbox Functions//Mapbox Functions//Mapbox Functions//
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
                new mapboxgl.Popup({offset: 25}) // add popups
                    .setHTML(
                        `<h3>${properties.title}</h3><p>${properties.description}</p>`
                    )
            )
            .addTo(map);
    }
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
    });
    createMarkers();
}


//first snippet of us-3 (copy/pasted)
// first call to spoontacular -> returns vague list of recipes with IDs
var offset = 0;
var globalQ = "";

//Spoonacular API Functions//Spoonacular API Functions//Spoonacular API Functions//Spoonacular API Functions
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
            console.log(data);
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
        $("#recipe").append(el).append("<br>")
        el.click(function(){
            clickFoodAnchor(result)
        })
    })
}

function clickFoodAnchor(result){
    ingredientsCall(result)
}

function addSpoonPagination(q){
    $("#prevspoon").toggleClass('d-none').click(function(){
        if (offset !== 0){
            offset -= 10;
        } else{
            return;
        }
        console.log(offset)
        nextSpoonCall(q, offset);
    })
    $("#morespoon").toggleClass('d-none').click(function(){
        offset += 10;
        nextSpoonCall(q, offset)
    })
}

function returnIngredients(data) {
    return data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join("");
}

function ingredientsCall(result) {
    // if ($("#prevspoon").hasClass('d-none')){
        $("#prevspoon").toggleClass('d-none');
    // }
    // if ($("#morespoon").hasClass('d-none')) {
        $("#morespoon").toggleClass('d-none');
    // }
    $.ajax({
        method: "GET",
        url: `https://api.spoonacular.com/recipes/${result.id}/information?apiKey=${KEYS.returnSpoonKey()}&includeNutrition=true`,
        success: function (data) {
            console.log(data);
            $("#recipe").html(`<button id="backbutton">Back</button> <br>${data.title}<br> <ul>${returnIngredients(data)}</ul>${data.instructions}
               <br> <button id="saverecipe">Save Recipe</button>`)
            $("#backbutton").click(function(){
                nextSpoonCall(globalQ, offset)
                $("#prevspoon").toggleClass('d-none');
                $("#morespoon").toggleClass('d-none');
            })
            $("#saverecipe").click(function (){
                saveRecipe(data);
            })
        }
    })
}

// Function to create join table between user and recipe ID
function saveRecipe(result){
    console.log(result)
    let recipeID = result.id

    let request = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(recipeID)
    };

    fetch("http://localhost:8080/api/recipes", request)
        .then((response) => {
            console.log(response.status)
            createView("/")
        });
}