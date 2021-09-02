import Home from "./Views/Home.js"
import {searchClick} from "./Views/Home.js"
/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
    const routes = {
         '/': {
             returnView: Home,
             state: {},
             uri: '/',
             title: 'Home',
             viewEvent: searchClick,
         }
    };

    return routes[URI];
}

