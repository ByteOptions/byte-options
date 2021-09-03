import * as KEYS from "../keys.js";
export default function Home() {
    return `<input id="inputMain" type="text" placeholder="search"> <button id="submit">Submit</button> <div id="recipe"></div> <div id="google_house"></div> <div id="youtubeBox"></div>`
}
export function searchClick(){
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

function getVideos(id){
    const q = $('#inputMain').val()
    const url = `https://www.googleapis.com/youtube/v3/search?key=${KEYS.returnGoogleKey()}&part=snippet&q=${q}+recipes&maxResults=4&type=video&videoEmbeddable=true`;
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
        embedData(data)
    })
}

function embedData(data){
    let dataArr = data.items
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