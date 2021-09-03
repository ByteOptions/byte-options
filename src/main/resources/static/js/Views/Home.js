import * as KEYS from "../keys.js";
export default function Home() {
    return `<input type="text" placeholder="search"> <button id="submit">Submit</button> <div id="recipe"></div> <div id="google_house"></div>`
}
export function searchClick(){
    $("#submit").click(function (){
        googleGet()
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