import Home, {homeEvents} from "./Views/Home.js"
import Register, {registerEvents} from "./Views/Register.js"
import Login, {loginEvents} from "./Views/Login.js"

// import {searchClick} from "./Views/Home.js"
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
             viewEvent: homeEvents,
         },
        '/register': {
             returnView: Register,
            state: {},
            uri: '/register',
            title: 'Register',
            viewEvent: registerEvents
        },
        '/login': {
            returnView: Login,
            state: {},
            uri: '/login',
            title: 'Login',
            viewEvent: loginEvents()
        }

    };

    return routes[URI];
}

