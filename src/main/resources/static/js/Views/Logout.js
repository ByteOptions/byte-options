import createView from "../createView.js";

export default function logOut(){
    return ``;
}

export function logOutEvents(){
    clearTokens();
}

export function clearTokens() {
    if (confirm("Are you sure you want to logout?")){
        localStorage.clear();
        createView("/");
    } else {
        createView("/");
    }
}




