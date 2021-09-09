
/**
 * Adds a login event to allow the com.codeup.capstonestarter.data.user to initially obtain a new OAuth2.0 token
 * On a successful response, sets the tokens into storage and redirects to the root
 */
export default function LoginEvent() {

}

/**
 * Gets the Authorization header needed for making requests to protected endpoints
 * This function should be used only after the com.codeup.capstonestarter.data.user is logged in
 * @returns {{Authorization: string, "Content-Type": string}|{"Content-Type": string}}
 */
export function getHeaders() {

}

/**
 * Attempts to set the access and refresh tokens needs to authenticate and authorize the client and com.codeup.capstonestarter.data.user
 * @param responseData
 */
function setTokens(responseData) {

}