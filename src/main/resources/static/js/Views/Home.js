import * as KEYS from "../keys.js";

export default function Home() {
    return `<input id="inputMain" type="text" placeholder="search"> <button id="submit">Submit</button> 
        <div id="recipe"></div> <div id="google_house"></div> <div id="youtubeBox"></div> 
        <button id="previous">Previous</button> <button id="loadMore">More videos</button>`
}

export function homeEvents() {
    searchClick();
    setLoadEvent();
    setPrevEvent()
}

function searchClick() {
    $("#submit").click(function () {
        getVideos()
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