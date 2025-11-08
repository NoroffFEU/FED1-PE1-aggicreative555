/**
 * Function initalizes login functionality on the login page specifically.
 * @function initializeCreate
 */

import { postFormTemplate } from "../ui/forms/postFormTemplate.mjs";
import { validateField } from "../ui/global/validateField.mjs";
import { isValidDescription, isValidImageAlt, isValidTitle, isValidUrl } from "../ui/global/validators.mjs";
import { navToggler } from "../ui/nav/navToggler.mjs";
import { onCreatePost } from "../ui/post/create.mjs";
import { load } from "../utilities/storage.mjs";

function initializeCreate() {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        alert("You must be logged in to create a post");
        setTimeout(() => {
        window.location.href = "/index.html";
        }, 1000);
        return;
    }

    const user = load("user");
    if (!user) {
        alert("User not found in storage");
        return;
    }

    const postData = {
        author: {
        name: user.name || "Anonymous",
        email: user.email || "No email provided",
        bio: user.bio || "Hi, I'm a vintage blogger!",
        },
        media: { url: "", alt: "" },
        title: "",
        body: "",
        tags: [],
    };

    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    if (header && footer) {
        navToggler();
    } else {
        console.error("No #footer or #header element located in the DOM");
    }
    

    const createForm = postFormTemplate({ isEdit: false, postData });
    document.querySelector("#formContainer").appendChild(createForm);

    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("body");
    const imageInput = document.getElementById("media-url");
    const imageAltInput = document.getElementById("media-alt");

    const titleValid = validateField(
    titleInput,
    isValidTitle,
    "The title of your post can only inlude letters and be between 1 - 100 characters",
    );
    
    const descValid = validateField(
    descriptionInput,
    isValidDescription,
    "The post body has to be more than 10 characters",
    );

    const imageValid = validateField(
    imageInput,
    isValidUrl,
    "Please add a valid image URL starting with https://",
    );

    const imageAltValid = validateField(
    imageAltInput,
    isValidImageAlt,
    "Write a small description of the image",
    );

    createForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const allValid = 
        titleValid() &&
        descValid() &&
        imageValid() &&
        imageAltValid();

        if (!allValid) {
            const message = document.getElementById("userSuccess");
            message.innerHTML = "";
            message.className.remove("invisible");
            message.className.add("message-container");
            message.textContent = "Please fill in all fields before submitting";
            return;
        }

        onCreatePost(e);
    })

}

initializeCreate();