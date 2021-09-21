import createView from "../createView.js";

export default function User(props) {
    console.log(props);
    console.log(props.user.username)
    return `<div class="main-wrapper d-flex justify-content-center align-items-center">
            <div class="container">
                <div>
                    <div class="page-content page-container" id="page-content">
                        <div class="padding">
                            <div class="row container d-flex justify-content-center">
                                <div class="col-xl-6 col-md-12">
                                    <div class="card user-card-full">
                                        <div class="row m-l-0 m-r-0">
                                            <div class="col-sm-4 bg-c-lite-green user-profile">
                                                <div class="card-block text-center text-white">
                                                    <div class="m-b-25"><img
                                                            src="/img/icons8-test-account-100.png"
                                                            class="img-radius" alt="User-Profile-Image"></div>
                                                    <h6 class="f-w-600">${props.user.username}</h6>
                                                     <i
                                                        class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="card-block">
                                                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <p class="m-b-10 f-w-600">Email</p>
                                                            <h6 class="text-muted f-w-400">${props.user.email}</h6>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <p class="m-b-10 f-w-600">Recipes Saved:</p>
                                                            <h6 class="text-muted f-w-400">${props.user.recipes.length}</h6>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <p class="m-b-10 f-w-600">Restaurants Saved:</p>
                                                            <h6 class="text-muted f-w-400">${props.user.restaurants.length}</h6>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <p class="m-b-10 f-w-600">Videos Saved:</p>
                                                            <h6 class="text-muted f-w-400">${props.user.videos.length}</h6>
                                                        </div>
                                                    </div>
                                                    <ul class="social-link list-unstyled m-t-40 m-b-10">
                                                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom"
                                                               title="" data-original-title="facebook"
                                                               data-abc="true"><i
                                                                class="mdi mdi-facebook feather icon-facebook facebook"
                                                                aria-hidden="true"></i></a></li>
                                                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom"
                                                               title="" data-original-title="twitter" data-abc="true"><i
                                                                class="mdi mdi-twitter feather icon-twitter twitter"
                                                                aria-hidden="true"></i></a></li>
                                                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom"
                                                               title="" data-original-title="instagram" data-abc="true"><i
                                                                class="mdi mdi-instagram feather icon-instagram instagram"
                                                                aria-hidden="true"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`;
}

export function UserEvent(){
}