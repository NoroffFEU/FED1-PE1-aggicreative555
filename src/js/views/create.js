/**
 * Function initalizes login functionality on the login page specifically.
 * @function initializeCreate
 */

import { postFormTemplate } from "../ui/forms/postFormTemplate.mjs";
import { validateField } from "../ui/global/validateField.mjs";
import { isValidDescription, isValidImageAlt, isValidTitle, isValidUrl } from "../ui/global/validators.mjs";
import { navToggler } from "../ui/nav/navToggler.mjs";
import { onCreatePost } from "../ui/post/create.mjs";

function initializeCreate() {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        alert("You must be logged in to create a post");
        setTimeout(() => {
        window.location.href = "/index.html";
        }, 1000);
        return;
    }

    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    if (header && footer) {
        navToggler();
    } else {
        console.error("No #footer or #header element located in the DOM");
    }

    const createForm = postFormTemplate({ isEdit: false });
    document.querySelector("#formContainer").appendChild(createForm);

    createForm.addEventListener("submit", onCreatePost);

    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("body");
    const imageInput = document.getElementById("media-url");
    const imageAltInput = document.getElementById("media-alt");

    validateField(
    titleInput,
    isValidTitle,
    "The title of your post can only inlude letters and be between 1 - 100 characters",
    );
    
    validateField(
    descriptionInput,
    isValidDescription,
    "The post body has to be more than 10 characters",
    );
    validateField(
    imageInput,
    isValidUrl,
    "Please add a valid image URL starting with https://",
    );
    validateField(
    imageAltInput,
    isValidImageAlt,
    "Write a small description of the image",
    );

}

initializeCreate();