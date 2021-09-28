/**
 * Pushes the current URI to the URL bar and sets the HTML of the app div.
 * @param props - the com.codeup.capstonestarter.data required for view rendering
 * @param route - the object containing information for the given endpoint
 */
import Navbar from "./Views/partials/Navbar.js";
import AuthorizedNavbar from "./Views/partials/AuthorizedNavbar.js";
import {getHeaders} from "./auth.js";
import createView from "./createView.js";

export default function render(props, route) {
    const app = document.querySelector('#app');
    const title = `ByteOptions - ${route.title}`;
    history.pushState(props, title, route.uri);
    document.title = title;

    // add view and navbar to DOM
    if (localStorage.getItem("access_token")) {
        $.ajax({
            url: `/api/users/me`,
            method: 'GET',
            headers: getHeaders(),
            statusCode: {

                401: function () {
                    app.innerHTML = `${Navbar(null)} ${route.returnView(props)}`;
                    if (route.viewEvent) {
                        route.viewEvent();
                    }
                },
                200: function () {
                    app.innerHTML = `${AuthorizedNavbar(null)} ${route.returnView(props)}`
                    if (route.viewEvent) {
                        route.viewEvent();
                    }

                }
            }
        })

    } else {
        app.innerHTML = `${Navbar(null)} ${route.returnView(props)}`;
        console.log("else fired")
        if (route.viewEvent) {
            route.viewEvent();
        }
    }


    // // add events AFTER view is added to DOM
    // if (route.viewEvent) {
    //     route.viewEvent();
    // }

}

// export function clearTokens() {
//
//     if (confirm("Are you sure you want to logout?")){
//         localStorage.clear();
//         createView("/");
//     }
// }
// clearTokens();
