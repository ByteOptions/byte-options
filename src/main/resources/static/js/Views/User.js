import createView from "../createView.js";
var globalProps;


export default function User(props) {
    globalProps = props;
    // console.log(globalProps);
    return `<div class="main-wrapper">
            <div class="container h-100 w-100">
                <div class="container w-100 h-100 g-0">
                    <div class="row  h-25">
                        <div class="container m-auto  w-75 h-75 row">
                            <div class="col-3 d-flex justify-content-center align-items-center p-0">
                                <img src="/img/icons8-test-account" class="p-0" alt="1"
                                     style="width: 75%; height: auto;">
                            </div>
                            <div class="col-9 d-flex flex-column flex-wrap justify-content-center align-items-center">
                                <p class="display-6 mt-4">${props.user.username}</p>
                                <p class=" text-muted mt-1">${props.user.email}</p>
                            </div>
                        </div>
                        <div class="d-flex flex-column align-items-center justify-content-center flex-md-row justify-content-md-between">
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
                                    View Saved Recipes(${props.user.videos.length})
                                </button>
                                <ul id="videos-ul" class="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="info-house" class="row  h-100">
                        
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
}

function addRestaurantClickToAnchors(props){
    $(".restaurants-click-anchor").click(function(){
        var id = $(this).attr('data-id');
        props.forEach(function(restaurant){
            if (restaurant.id == id){
                $("#info-house").html("").append(`
                <div class=" container  justify-content-center align-items-center overflow-auto">
                <div>
                    <p class="display-5">${restaurant.name}</p>
                    <p class="display-6 text-muted">${restaurant.vicinity}</p>
                </div>

                </div>
                `)

            }
        })
    })

}

function deployRestaurantsButtonItems(userProp){

        userProp.forEach(function (item) {
            $("#restaurants-ul").append(`<li><a class="restaurants-click-anchor dropdown-item" data-id="${item.id}" href="#">${item.name}</a></li>`)
        })


}
function deployRecipesButtonItems(userProp){

    userProp.forEach(function (item) {
        $("#recipes-ul").append(`<li><a class="dropdown-item" data-id="${item.id}" href="#">${item.title}</a></li>`)
    })


}
function deployVideosButtonItems(userProp){

    userProp.forEach(function (item) {
        $("#videos-ul").append(`<li><a class="dropdown-item" data-id="${item.id}" href="#">${item.title}</a></li>`)
    })


}