import * as KEYS from "../keys.js";
import {getHeaders} from "../auth.js";
import createView from "../createView.js";

var globalProps;

var map;

export default function User(props) {
    globalProps = props;
    console.log(globalProps);
    return `<div class="main-wrapper">
            <div id="first-div-inner" class="container w-100">
                <div id="second-div-inner" class="container w-100 h-100 g-0">
                    <div class="row  h-25">
                        <div class="container m-auto  w-75 h-75 row">
                            <div class="col-3 d-flex justify-content-center align-items-center p-0">
                                <img src="../../img/humanperson.png" class="p-0" alt="1"
                                     style="width: 50%; height: auto; margin: 5px">
                            </div>
                            <div class="col-9 d-flex flex-column flex-wrap justify-content-center align-items-center">
                                <p class="display-4 mt-4">Hello, ${props.user.username}</p>
                            </div>
                        </div>
                        <div class="d-flex flex-column align-items-center justify-content-center flex-md-row justify-content-md-around">
                            <div class="dropdown my-1 my-md-0">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    View Saved Recipes(${props.user.recipes.length})
                                </button>
                                <ul id="recipes-ul" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    
                                </ul>
                            </div>
                            <div class="dropdown my-1 my-md-0">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    View Saved Restaurants(${props.user.restaurants.length})
                                </button>
                                <ul id="restaurants-ul" class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                    
                                </ul>
                            </div>
                            <div class="dropdown my-1 my-md-0">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton3"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    View Saved Videos(${props.user.videos.length})
                                </button>
                                <ul id="videos-ul" class="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="info-house" class="row  h-100 py-2 px-4">
                        
                    </div>
                </div>
            </div>
`;

}

export function UserEvent(){
    deployRestaurantsButtonItems(globalProps.user.restaurants);
    deployRecipesButtonItems(globalProps.user.recipes);
    deployVideosButtonItems(globalProps.user.videos);
    addRestaurantClickToAnchors(globalProps.user.restaurants);
    addRecipesClickToAnchors(globalProps.user.recipes)
    addVideosClickToAnchors(globalProps.user.videos);
}
function addVideosClickToAnchors(props){
    $(".videos-click-anchor").click(function(){
        var id = $(this).attr('data-id');
        props.forEach(function(video){
            if (video.id == id){
                $("#info-house").html("").append(`
                <div class=" container  justify-content-center align-items-center overflow-auto">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <p class="display-5">${video.title}</p>
                    <iframe class="m-3 col-auto" src="https://www.youtube.com/embed/${video.videoID}"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                    </iframe>
                    
                </div>
                 <div class="d-flex justify-content-end align-items-end">
                <button data-id="${id}" id="delete-video-button" class="btn btn-secondary" type="button">Delete</button>
                </div>

                </div>
                `)

            }
        })

        loadVideoDeleteButton();
    })

}

function addRestaurantClickToAnchors(props){
    $(".restaurants-click-anchor").click(function(){
        var id = $(this).attr('data-id');
        var globalRestaurant;
        props.forEach(function(restaurant){
            if (restaurant.id == id){
                globalRestaurant = restaurant
                $("#info-house").html("").append(`
                <div class=" container  justify-content-center align-items-center overflow-auto">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <p class="display-5">${restaurant.name}</p>
                    <p class="display-6 text-muted">${restaurant.vicinity}</p>
                    <div style="width: 80vw; height: 50vh;" id="map"></div>
                    
                </div>
                 <div class="d-flex justify-content-end align-items-end">
                <button data-id="${id}" id="delete-restaurant-button" class="btn btn-secondary" type="button">Delete</button>
                </div>

                </div>
                `)

            }
        })
        mapBox();
        getLocations(globalRestaurant);
        loadRestaurantDeleteButton();
    })

}
var geojson = {
    type: 'FeatureCollection',
    features: []
};
function mapBox() {
    mapboxgl.accessToken = KEYS.returnMapboxKey();
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-98.4936, 29.4241], // starting position [lng, lat]
        zoom: 12 // starting zoom
    });

}
function getLocations(restaurant) {
    $.ajax({
        method: "GET",
        url: `https://cors-anywhere.hirshwebsite.website/https://maps.googleapis.com/maps/api/place/details/json?place_id=${restaurant.placeId}&key=${KEYS.returnGoogleKey()}`,
        success: function (data) {
            console.log(data);
            combLocation(data);
        }
    })
}
function combLocation(data) {


        let lng = data.result.geometry.location.lng;
        let lat = data.result.geometry.location.lat;
        geojson.features.unshift({
            type: 'Feature',
            geometry: {type: 'Point', coordinates: [lng, lat]},
            properties: {title: `${data.result.name}`, description: `${data.result.vicinity}`}
        })



    createMarkers();
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
                new mapboxgl.Popup() // add popups
                    .setHTML(
                        `<form class="popup-form"> 
                        <p class="restaurantName">${properties.title}</p> 
                        <br>
                          <p class="vicinity">${properties.description}</p> 
                       
                        </form>`
                    )
            )
            .addTo(map);
    }

}

function addRecipesClickToAnchors(props){
    $(".recipes-click-anchor").click(function(){
        var id = $(this).attr('data-id');
        props.forEach(function(recipe){
            if (recipe.id == id){
                $("#info-house").html("").append(`
                <div class=" container  justify-content-center align-items-center overflow-auto">
            <div>
                <p class="display-5">${recipe.title}</p>
            </div>
            <div>
                <ul class="p-0" id="recipes-ul">
                    ${returnIngredients(recipe)}
                </ul>
            </div>
            <div>
                ${returnInstructions(recipe)}
            </div>
            <div class="d-flex justify-content-end align-items-end">
            <button data-id="${id}" id="delete-recipe-button" class="btn btn-secondary" type="button">Delete</button>
            </div>
                `)

            }
        })
        loadRecipeDeleteButton()
    })

}
function loadRecipeDeleteButton(){
    $("#delete-recipe-button").click(function(){
        if(confirm("Are you sure you want to delete this recipe?")){
            let id = $(this).attr("data-id");
            console.log(id);
            $.ajax({
                url:`/api/users/deleteRecipe/${id}`,
                method: "DELETE",
                headers: getHeaders(),
                success: function(){
                    alert("Successfully Deleted Recipe");
                    createView("/user");
                }
            })
        }
    })
}
function loadRestaurantDeleteButton(){
    $("#delete-restaurant-button").click(function(){
        if(confirm("Are you sure you want to delete this restaurant?")){
            let id = $(this).attr("data-id");
            console.log(id);
            $.ajax({
                url:`/api/users/deleteRestaurant/${id}`,
                method: "DELETE",
                headers: getHeaders(),
                success: function(){
                    alert("Successfully Deleted Restaurant");
                    createView("/user");

                }
            })
        }
    })
}
function loadVideoDeleteButton(){
    $("#delete-video-button").click(function(){
        if(confirm("Are you sure you want to delete this video?")){
            let id = $(this).attr("data-id");
            console.log(id);
            $.ajax({
                url:`/api/users/deleteVideo/${id}`,
                method: "DELETE",
                headers: getHeaders(),
                success: function(){
                    alert("Successfully Deleted Video");
                    createView("/user");
                }
            })
        }
    })
}

function returnInstructions(recipe){
    let instructions = JSON.parse(recipe.instructions.instructionsJson);
    return instructions.instructions;
}

function returnIngredients(recipe) {
    let ingredients = JSON.parse(recipe.ingredients.ingredientsJson);
    console.log(ingredients);
    return ingredients.map(ingredient => `<li">${ingredient.original}</li><br>`).join("");
}


function deployRestaurantsButtonItems(userProp){

        userProp.forEach(function (item) {
            $("#restaurants-ul").append(`<li><a class="restaurants-click-anchor dropdown-item" data-id="${item.id}" href="#">${item.name}</a></li>`)
        })


}
function deployRecipesButtonItems(userProp){

    userProp.forEach(function (item) {
        $("#recipes-ul").append(`<li><a class="recipes-click-anchor dropdown-item" data-id="${item.id}" href="#">${item.title}</a></li>`)
    })


}
function deployVideosButtonItems(userProp){

    userProp.forEach(function (item) {
        $("#videos-ul").append(`<li><a class="videos-click-anchor dropdown-item" data-id="${item.id}" href="#">${item.title}</a></li>`)
    })


}