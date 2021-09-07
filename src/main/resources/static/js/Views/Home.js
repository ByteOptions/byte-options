import * as KEYS from "../keys.js";
// import mapboxgl from '../../node_modules/mapbox-gl';

export default function Home() {
    return `<input id="inputMain" type="text" placeholder="search"><button id="submit">Submit</button> <div id="recipe">
    </div><div id="map" style="width: 400px; height: 300px;"></div>`
}

export function searchClick() {
    mapBox()
    $("#submit").click(function () {

        // searchRecipes();
        searchGeocoder();
    })
}

function searchGeocoder(){
    let q = $("#inputMain").val();
    $.ajax({
        method: "GET",
        url: `https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/tilequery/-98.4936,29.4241.json?limit=50&access_token=${mapboxgl.accessToken}&radius=3000&dedupe=false`,
        success: function(data){
            console.log(data);
            console.log("tiles");

        }
    });

}


function mapBox() {
    mapboxgl.accessToken = KEYS.returnMapboxKey();
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-98.4936, 29.4241], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    //this adds a search bar on our map but we already use one as the main feature of the site so its commented out for now
    // map.addControl(
    //     new MapboxGeocoder({
    //         accessToken: mapboxgl.accessToken,
    //         mapboxgl: mapboxgl
    //     })
    // );
}


//first snippet of us-3 (copy/pasted)
// // first call to spoontacular -> returns vague list of recipes with IDs
// function searchRecipes() {
//     let q = $("#inputMain").val();
//     $.ajax({
//         method: "GET",
//         url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEYS.returnSpoonKey()}&query=${q}&offset=0&number=10`,
//         success: function (data) {
//             console.log(data);
//             getRecipe(data);
//         }
//     })
// }
// //second call to spoontacular, -> returns more indepth results with given ID's
// function getRecipe(data){
//     $.ajax({
//         method: "GET",
//         url: `https://api.spoonacular.com/recipes/${data.results[0].id}/information?apiKey=${KEYS.returnSpoonKey()}&includeNutrition=true`,
//         success: function(data){
//             console.log(data);
//             $("#recipe").html(`${data.title}<br> <ul>${returnIngredients(data)}</ul>${data.instructions}`)
//         }
//     })
//
// }
// // decipher getRecipe data into list items to append to html
// function returnIngredients(data){
//     return data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join("");
// }