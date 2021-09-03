import * as KEYS from "../keys.js";
export default function Home() {
    return `<input id="inputMain" type="text" placeholder="search"> <button id="submit">Submit</button> <div id="recipe"></div> <div id="google_house"></div> <div id="youtubeBox"></div> <button id="load">More videos</button>`
}

export function homeEvents(){
    searchClick();
    setLoadEvent();
}

function searchClick(){
    $("#submit").click(function (){
        googleGet()
        getVideos()
        })
}
function googleGet(){
    $("#google_house").append(`<iframe
  width="450"
  height="250"
  frameborder="0" style="border:0"
  src="https://www.google.com/maps/embed/v1/place?key=${KEYS.returnGoogleKey()}&q=San+Antonio" allowfullscreen>
</iframe>`)
}

let page = 1;
let pageToken = "";

function getVideos(){
    const q = $('#inputMain').val()
    console.log("get video's are called")
    const url = `https://www.googleapis.com/youtube/v3/search?key=${KEYS.returnGoogleKey()}&part=snippet&q=${q}+recipes&maxResults=4&per_page=4&pageToken=${pageToken}&type=video&videoEmbeddable=true`;
    const option = {
        method: 'GET',
        header:{
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

function embedData(data){
    let dataArr = data.items
    pageToken = data.nextPageToken;
    dataArr.forEach(function(video){
        console.log(video.id)
        $('#youtubeBox').append(`
        <iframe class="video" col="auto" src="https://www.youtube.com/embed/${video.id.videoId}" 
        title="YouTube video player" 
        frameborder="=0"
        allow="accelermeter; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>` )
    })
}
function setLoadEvent() {
    $('#load').on('click', function () {
        page++;
        getVideos();
        console.log(page)
    })
}