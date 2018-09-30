import $ from 'jquery';

// Get the contents of a cookie.
export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = $.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Define header for API calls which require the CSRF token
export const csrfHeader = {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie('csrftoken')
};


// Generate two random numbers to form one string--used to setup a namespace for actions/reducers
export function getNamespace() {
    let randomString = '';
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 15; i++) {
        randomString += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomString;
}

// Format label and placeholder text from ComponentID
export function getFormattedLabelText(componentID) {
    return componentID.replace(/([A-Z])/g, ' $1');
}
