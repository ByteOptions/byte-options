import * as KEYS from "../keys.js";
import createView from "../createView.js";
import {getHeaders} from "../auth.js";

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})


var map;

var geojson = {
    type: 'FeatureCollection',
    features: []
};


export default function Home() {
    return `  
  <div id="background">
            <div id="searchHouse" class="container">
                <br/>
                <div class="row justify-content-center">
                    <div id="searchBox" class="col-12 col-md-10 col-lg-8">
                        <form id="search-bar-form" class="card card-sm">
                            <div id="search-bar-home" class="card-body row no-gutters align-items-center">
                                <div class="col-auto">
                                    <i class="fas fa-search h4 text-body"></i>
                                </div>
                                <div class="col">
                                <form id="searchForm">
                                    <input id="inputMain" class="form-control form-control-lg form-control-borderless"
                                           type="search" placeholder="What do you feel like eating today?">
                                </form>
                                </div>
                                <div class="col-auto">
                                    <button id="submit" class="btn" type="button">Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="info" class="container d-none">
                <div class="">
                    <div class="row">
                        <div id="recipeContainer" class="col-md-8">
                            <div id="recipe">
                            </div>
                            <div id="buttonsContainer">
                                <button id="prevspoon" class="d-none btn btn-outline-dark">Previous</button>
                                <button id="morespoon" class="d-none btn btn-outline-dark">More</button></div>
                            </div>
                        <div class="col-md-4">
                            <div id="big-box" class="d-flex justify-content-center flex-wrap">
                                <div id="youtubeBox" class="d-flex justify-content-center flex-wrap"></div>
                                <br>
                                <button id="prevbtn" class="d-none btn btn-outline-dark">Previous</button>
                                <button id="morebtn" class="d-none btn btn-outline-dark">More videos</button>
                                <br>
                                <div id="google_house">
                                    <h1 id="mapTitle">Places Near You</h1>
                                </div>
                                <div class="m-3" id="map" style="width: 300px; height: 250px;"></div>
                                <a id="Ainfo"></a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
         `
}

jQuery(document).on("keypress", 'form', function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        e.preventDefault();
        return false;
    }
});
// var service;

export function homeEvents() {
    searchClick();
}
// function googlePlaces(){
//     console.log("fired")
//     service = new google.maps.places.PlacesService(map);
//     let request = {
//         location: [-98, 28],
//         radius: 3000,
//         keyword: "pizza"
//     }
//     service.nearbySearch(request, function(data){
//         console.log(data);
//     })
//
// }

function scrollToAnchor() {
    var aTag = $("#Ainfo");
    $('html,body').animate({scrollTop: aTag.offset().top}, 'slow');
}

function searchClick() {
    $("#submit").click(function () {
    submitEvent()
    })
    $("#inputMain").keypress(function (e){
        if(e.which === 13){
            submitEvent()
        }
    })
}

function submitEvent(){
    let q = $("#inputMain").val();
    console.log(q);
    getVideos(q);
    searchRecipes(q);
    scrollToAnchor();
    hideDivs();
    requestAuthority(q);
}

function requestAuthority(q) {
    if (localStorage.getItem("access_token")) {
        $.ajax({
            url: `/api/users/me`,
            method: 'GET',
            headers: getHeaders(),
            statusCode: {

                401: function () {
                    console.log("401 fired")
                    $("#map").html("").html(`<div>Register an account to see locations serving ${q}!</div>`)

                },
                200: function (data) {
                    console.log(data);
                    console.log(data.center);

                    console.log("200 fired")
                    getLocations(q, data.center);
                    mapBox(data.center);


                }
            }
        })
    } else {
        $("#map").html("").html(`<div>Register an account to see locations serving ${q}!</div>`);
    }

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
    $("#youtubeBox").html(`<h1 id="youtubeTitle">Video Tutorials</h1>`);
    let dataArr = data.items
    dataArr.forEach(function (video) {
        $("#youtubeBox").append(`
            <iframe  class="m-3 videoBox col-auto" src="https://www.youtube.com/embed/${video.id.videoId}" title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen> 
                 </iframe><button data-value="${video.snippet.title}" data-id="${video.id.videoId}" type="button" class="btn btn-outline-dark videoSave">Save Video</button>`)

    })

    setVideoSaveEvent()

}

function setVideoSaveEvent() {
    $(".videoSave").click(function () {
        let videoid = ($(this).attr("data-id"));
        let title = ($(this).attr("data-value"))
        console.log(videoid);
        console.log(title);

        let saveVideos = {
            "videoID": videoid,
            "title": title
        }
        console.log(saveVideos)
        console.log(JSON.stringify(saveVideos))
        let request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(saveVideos)
        };

        fetch("/api/videos", request)
            .then((response) => {
                if (!response.ok) {
                    alert("Register an account to save videos.")
                } else {
                    console.log(response.status)
                    alert("Video was saved")
                }
            });
    })
}

function addYoutubePagination(q) {
    $("#morebtn").click(function () {
        getNextVideo(q, nextPageToken);

    })
    $("#prevbtn").click(function () {
        getNextVideo(q, prevPageToken);

    })
}

function getLocations(q, center) {
    let coords = center.split(",")
    $.ajax({
        method: "GET",
        url: `https://cors-anywhere.hirshwebsite.website/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords[1]}%2C${coords[0]}&radius=3000&key=${KEYS.returnGoogleKey()}&type=restaurant&keyword=${q}`,
        success: function (data) {
            console.log(data);
            console.log("locations")
            combLocation(data);
        }
    })
}

//Mapbox Functions//Mapbox Functions//Mapbox Functions//Mapbox Functions//Mapbox Functions//
function mapBox(center) {
    let coords = center.split(",")
    mapboxgl.accessToken = KEYS.returnMapboxKey();
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [coords[0], coords[1]], // starting position [lng, lat]
        zoom: 10 // starting zoom
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
                        <p data-id="${properties.placeId}" class="restaurantName">${properties.title}</p> 
                        <br>
                          <p class="vicinity">${properties.description}</p> 
                        <button type="button" class="saveBtn btn-outline-dark restaurantSave">Save</button> 
                        </form>`
                    )
            )
            .addTo(map);
    }

}

function setSaveEvent() {

    $('#map').on("click", ".mapboxgl-popup .mapboxgl-popup-content .popup-form .restaurantSave", function () {
        console.log($(this).siblings(".restaurantName").text())
        let restaurantName = $(this).siblings(".restaurantName").text()
        let placeId = $(this).siblings(".restaurantName").attr('data-id');
        let vicinity = $(this).siblings(".vicinity").text()

        let savedRestaurants = {
            "name": restaurantName,
            "vicinity": vicinity,
            "placeId": placeId
        }

        console.log(savedRestaurants)

        let request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(savedRestaurants)
        };

        fetch("/api/restaurants", request)
            .then((response) => {
                if (!response.ok) {
                    alert("Register an account to save restaurants.")
                } else {
                    console.log(response.status)
                    alert("Restaurant was saved")
                }

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
            properties: {title: `${result.name}`, description: `${result.vicinity}`, placeId: `${result.place_id}`}
        })


    });
    createMarkers();
    setSaveEvent();
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
            apiKey: KEYS.returnSpoonKey(),
            query: q,
            offset: 0,
            number: 12,
        },
        success: function (data) {
            console.log(data);
            // ingredientsCall(data)
            embedFoodAnchors(data);
            addSpoonPagination(q);
            scrollToAnchor();
        }
    })
}

function nextSpoonCall(q, offset) {
    $.ajax({
        method: "GET",
        url: `https://api.spoonacular.com/recipes/complexSearch`,
        data: {
            apiKey: KEYS.returnSpoonKey(),
            query: q,
            offset: offset,
            number: 12,
        },
        success: function (data) {
            console.log(data);
            // ingredientsCall(data)
            embedFoodAnchors(data)
        }
    })
}

function embedFoodAnchors(data) {
    console.log(data)
    $("#recipe").html(`<h1 id="recipeTitle">Recipes</h1><div id="containersContainer"></div>`);
    data.results.forEach(function (result) {
        let el = $(`<div id="recipeContainers"><a id="recipeLinks" class="clickAnchor" data-id="${result.id}"
        data-bs-toggle="tooltip" data-bs-html="true" title="${result.title}">${result.title}</a>
                <img id="recipeImage" alt="${result.name}" src="${result.image}"></div>`)
        console.log(el);
        $("#containersContainer").append(el).append("<br>");
        el.click(function () {
            clickFoodAnchor(result)
        })
    })
}

function clickFoodAnchor(result) {
    ingredientsCall(result)
}

function addSpoonPagination(q) {
    $("#prevspoon").toggleClass('d-none').click(function () {
        if (offset !== 0) {
            offset -= 10;
        } else {
            return;
        }
        console.log(offset)
        nextSpoonCall(q, offset);
    })
    $("#morespoon").toggleClass('d-none').click(function () {
        offset += 10;
        nextSpoonCall(q, offset)
    })
}

function returnIngredients(data) {
    return data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join("");
}

function ingredientsCall(result) {
    $.ajax({
        method: "GET",
        url: `https://api.spoonacular.com/recipes/${result.id}/information?apiKey=${KEYS.returnSpoonKey()}&includeNutrition=true`,
        success: function (data) {
            $("#prevspoon").toggleClass('d-none');
            $("#morespoon").toggleClass('d-none');
            console.log(data);
            $("#recipe").html(`<button class=" btn btn-outline-dark" id="backbutton">Back</button> <br><div id="recipeTitleSmall" >${data.title}</div><br>
            <ul>${returnIngredients(data)}</ul>${data.instructions}<br><button id="saverecipe" class="btn btn-outline-dark">Save Recipe</button>`)
            $("#backbutton").click(function () {
                nextSpoonCall(globalQ, offset)
                $("#prevspoon").toggleClass('d-none');
                $("#morespoon").toggleClass('d-none');
            })
            $("#saverecipe").click(function () {
                saveRecipe(data);
            })
        }
    })
}


// Function to create join table between user and recipe ID
function saveRecipe(result) {
    let obj = {
        "title": `${result.title}`,
        "ingredients": {
            "ingredientsJson": `${JSON.stringify(result.extendedIngredients)}`
        },
        "instructions": {
            "instructionsJson": `{\"instructions\":${JSON.stringify(result.instructions)}}`
        },
        "nutrition": {
            "nutritionJson": `${JSON.stringify(result.nutrition.nutrients)}`
        }


    }
    console.log(obj);


    let request = {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(obj)
    };
    console.log(request);
    fetch(`/api/recipes/`, request)
        .then((response) => {
            if (!response.ok) {
                alert("Register an account to save recipes.")
            } else {
                console.log(response.status)
                alert("Recipe was saved")
            }


        });


}

function hideDivs(result) {
    if ($("#info").hasClass('d-none')) {
        $("#info").toggleClass('d-none');
    }
}
