import render from './render.js';
import router from './router.js';
import fetchData from "./fetchData.js";
import {getHeaders} from "./auth.js";
let count = 0;

/**
 * Finds the correct route for a given view, builds a loading view, fetches com.codeup.capstonestarter.data and builds the final rendered view.
 * @param URI
 */
export default function createView(URI) {

    let route = router(URI);

    // if route is invalid, return a 404 page

    // change view to loading screen

    let request = {
        headers: getHeaders()
    }

    fetchData(route.state, request).then((props) => {
        render(props, route);
    });
}



