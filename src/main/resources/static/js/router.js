import Home, {homeEvents} from "./Views/Home.js"
import Register, {createRegisterEvents} from "./Views/Register.js"
import registerEvent from "./views/Register.js"
import Login, {loginEvents} from "./Views/Login.js"
import Restaurants, {restaurantsEvents} from "./Views/Restaurants.js";
import Recipes, {recipesEvents} from "./Views/Recipes.js";
import User, {UserEvent} from "./Views/User.js";
import LoginEvent from "./auth.js";


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
            viewEvent: createRegisterEvents
        },

        '/login': {
            returnView: Login,
            state: {},
            uri: '/login',
            title: 'Login',
            viewEvent: LoginEvent
        },

        '/recipes': {
            returnView: Recipes,
            state: {recipes: '/api/recipes'},
            uri: '/recipes',
            title: 'Recipes',
            viewEvent: recipesEvents
        },

        '/restaurants': {
            returnView: Restaurants,
            state: {},
            uri: '/restaurants',
            title: 'Restaurants',
            viewEvent: restaurantsEvents
        },

        '/users': {
            returnView: User,
            state: {users:"/api/users"},
            url: '/users',
            title:"Users",
            viewEvent : UserEvent
        }

    };

    return routes[URI];
}

