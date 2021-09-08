import * as KEYS from "../keys.js";

var map;

var geojson = {
    type: 'FeatureCollection',
    features: []
};


export default function Home() {
    return `<input id="inputMain" type="text" placeholder="search"> <button id="submit">Submit</button> 
        <div id="recipe"></div> <div id="google_house"></div> <div id="recipe"></div>
    <div id="map" style="width: 400px; height: 300px;"></div>\` <div id="youtubeBox"></div> 
        <button id="previous">Previous</button> <button id="loadMore">More videos</button>`
}

export function homeEvents() {
    searchClick();
    setLoadEvent();
    setPrevEvent()
}

function searchClick() {
    $("#submit").click(function () {
        let q = $("#inputMain").val()
        console.log(q);
        getLocations(q);
        // searchRecipes();

        getVideos()
        mapBox()
        searchRecipes()
    })
}

let page = 1;
let pageToken = "";
let prevPageToken = "";

function getVideos() {
    const q = $('#inputMain').val()
    console.log("get video's are called")
    const url = `https://www.googleapis.com/youtube/v3/search?key=${KEYS.returnGoogleKey()}&part=snippet&q=${q}+recipes&maxResults=2&per_page=4&pageToken=${pageToken}&prevPageToken=${prevPageToken}&type=video&videoEmbeddable=true`;
    const option = {
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        }
    };
    fetch(url, option)
        .then(res => res.json()
        ).then(data => {
        $("#youtube");
        console.log(data)
        embedData(data)
    })
}

function embedData(data) {
    $('#youtubeBox').html("")
    let dataArr = data.items
    pageToken = data.nextPageToken;
    prevPageToken = data.prevPageToken;
    dataArr.forEach(function (video) {
        console.log(video.id)
        $('#youtubeBox').append(`
        <iframe class="video" col="auto" src="https://www.youtube.com/embed/${video.id.videoId}" 
        title="YouTube video player" 
        frameborder="=0"
        allow="accelermeter; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`)
    })
}

function setLoadEvent() {
    $('#loadMore').on('click', function () {
        page++;
        getVideos();
        console.log(page)
    })
}

function setPrevEvent(){
    $('#previous').on('click', function () {
        page--;
        getVideos();
        console.log(page)
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
    for (const { geometry, properties } of geojson.features) {
// create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';

// make a marker for each feature and add it to the map
        new mapboxgl.Marker()
            .setLngLat(geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
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
function searchRecipes() {
    let q = $("#inputMain").val();
    $.ajax({
        method: "GET",
        url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEYS.returnSpoonKey()}&query=${q}&offset=0&number=10`,
        success: function (data) {
            console.log(data);
            getRecipe(data);
        }
    })
}
//second call to spoontacular, -> returns more indepth results with given ID's
function getRecipe(data){
    $.ajax({
        method: "GET",
        url: `https://api.spoonacular.com/recipes/${data.results[0].id}/information?apiKey=${KEYS.returnSpoonKey()}&includeNutrition=true`,
        success: function(data){
            console.log(data);
            $("#recipe").html(`${data.title}<br> <ul>${returnIngredients(data)}</ul>${data.instructions}`)
        }
    })

}
// decipher getRecipe data into list items to append to html
function returnIngredients(data){
    return data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join("");
}