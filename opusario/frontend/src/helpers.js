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

// Flatten errors into simple array
export function getFlattenedErrors(json) {
    let errors = [];
    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            errors.push.apply(errors, json[key]);
        }
    }
    return errors;
}

// Get errors to display associated with the InputComponent
export function getFormattedInputComponentErrors(inputErrors, errorMessages) {
    for (let key in inputErrors) {
        if (inputErrors.hasOwnProperty(key)) {
            if (inputErrors[key]) {
                errorMessages.push(`Value for ${key.replace(/_/g, ' ')} needs to be corrected.` )
            }
        }
    }
    return errorMessages;
}

// Format label and placeholder text from ComponentID
export function getFormattedLabelText(componentID) {
    return componentID.replace(/([A-Z])/g, ' $1').substring(1);
}

// Generate random string to setup a namespace for actions/reducers
export function getNamespace() {
    let randomString = '';
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 15; i++) {
        randomString += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomString;
}

// Format text as title case
export function getTextAsTitleCase(textItem) {
  return textItem.toLowerCase().split(' ').map(function(singleWord) {
    return (singleWord.charAt(0).toUpperCase() + singleWord.slice(1));
  }).join(' ');
}
