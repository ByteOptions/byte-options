export default function Home() {
    return `<input type="text" placeholder="search"> <button id="submit">Submit</button> <div id="recipe"></div>`
}
export function searchClick(){
    $("#submit").click(function (){
        $("#recipe").html("pasta or something")
        })
}