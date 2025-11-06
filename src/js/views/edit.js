/**
 * Function initalizes login functionality on the login page specifically.
 * @function initializeUpdate
*/

import { readPost } from "../api/posts/read.mjs";
import { postFormTemplate } from "../ui/forms/postFormTemplate.mjs";
import { validateField } from "../ui/global/validateField.mjs";
import { isValidDescription, isValidImageAlt, isValidTitle, isValidUrl } from "../ui/global/validators.mjs";
import { navToggler } from "../ui/nav/navToggler.mjs";
import { onEditPost } from "../ui/post/edit.mjs";

async function initializeEdit() {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        alert("You must be logged in to edit a post");
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

    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");
    if (!postId) {
        console.error("No post id found in url");
    }

    let postData; 
    try {
        postData = await readPost(postId);
        console.log("post for editing", postData)
    } catch (error) {
        console.error("Failed to load post:", error);
        const container = document.querySelector("#formContainer");
        container.textContent = "Failed to load post for editing. Please try again later."
    }

    const editForm = postFormTemplate({ isEdit: true, postData });
    const container = document.querySelector("#formContainer");
    container.innerHTML = "";
    container.appendChild(editForm);

    editForm.addEventListener("submit", onEditPost );

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

initializeEdit();