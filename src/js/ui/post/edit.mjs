
/**
 * @async
 * Handles form submission for creating a new post.
 * Converts flat form data into the expected API structure (including media).
 *
 * @param {SubmitEvent} event - The form submit event
 */

import { updatePost } from "../../api/posts/update.mjs";


export async function onEditPost(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        console.error("Missing post id in URL");
        return;
    }

    const messageContainer = document.getElementById("userSuccess");


    const postData = {
        title: formData.get("title"),
        tags: formData.get("tags")?.split(",").map(tag => tag.trim()).filter(Boolean),
        body: formData.get("body") || "",
        media: {
        url: formData.get("media.url") || "",
        alt: formData.get("media.alt") || "",
        },
    };

    try {
        const newPost = await updatePost(id, postData);

        if (newPost && newPost.data && newPost.data.id) {
        messageContainer.innerHTML = "";   
        messageContainer.classList.remove("invisible");
        messageContainer.classList.add("message-container");
        messageContainer.innerHTML = "Post created successfully!";
        // Redirect to the single post view with the new post ID
          setTimeout(() => {
            window.location.href = `/post/?id=${newPost.data.id}`;
        }, 2000);
        alert("Success!")
        } else {
        throw new Error("Post creation succeeded but no ID was returned.");
        }
    } catch (error) {
        console.error("Error creating post:", error);
        messageContainer.innerHTML = "";
        messageContainer.classList.remove("invisible");
        messageContainer.classList.add("message-container");
        messageContainer.innerHTML =
        "Failed to create post, check your fields and try again";
        setTimeout(() => {
          window.location.reload();
        }, 1500);
    }
}