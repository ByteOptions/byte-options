/**
 * Adds a login event to allow the com.codeup.capstonestarter.data.user to initially obtain a new OAuth2.0 token
 * On a successful response, sets the tokens into storage and redirects to the root
 */
import createView from "./createView.js";
import fetchData from "./fetchData.js";

export default function LoginEvent() {
    document.querySelector("#login-btn").addEventListener("click", function () {
        let obj = {
            username: document.querySelector("#emailInput").value,
            password: document.querySelector("#passwordInput").value,
            grant_type: 'password'
        }

        let request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa('rest-blog-client:secret')
            },
            body: `grant_type=${obj.grant_type}&username=${obj.username}&password=${obj.password}&client_id=rest-blog-client`
        };

        fetchData(
            {
                route: `/oauth/token`
            },
            request).then((data) => {
            setTokens(data);
            createView("/");
        });
    });
}

/**
 * Gets the Authorization header needed for making requests to protected endpoints
 * This function should be used only after the com.codeup.capstonestarter.data.user is logged in
 * @returns {{Authorization: string, "Content-Type": string}|{"Content-Type": string}}
 */
export function getHeaders() {
    const token = localStorage.getItem("access_token");
    return token
        ? {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${token}`}

        : {'Content-Type': 'application/json'};
}

/**
 * Attempts to set the access and refresh tokens needs to authenticate and authorize the client and com.codeup.capstonestarter.data.user
 * @param responseData
 */
function setTokens(responseData) {
    if (responseData.route['access_token']) {
        localStorage.setItem("access_token", responseData.route['access_token']);
        console.log("Access token set");
    }
    if (responseData.route['refresh_token']) {
        localStorage.setItem("refresh_token", responseData.route['refresh_token']);
        console.log("Refresh token set")
    }
}