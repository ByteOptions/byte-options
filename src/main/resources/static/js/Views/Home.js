import * as KEYS from "../keys.js";
// import mapboxgl from '../../../../../../node_modules/mapbox-gl';

export default function Home() {
    return `<input id="inputMain" type="text" placeholder="search"><button id="submit">Submit</button> <div id="recipe">
    </div><div id="map" style="width: 400px; height: 300px;"></div>`
}

export function searchClick() {
    mapBox()
    $("#submit").click(function () {
    })
}


function mapBox() {
    mapboxgl.accessToken = KEYS.returnMapboxKey();
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
}