import { deletePost } from "../../api/posts/delete.mjs";

/**
 * Handles post deletion from the current page.
 *
 * @async
 * @function onDeletePost
 * @param {Event} event - The button click event.
 * @throws {Error} If the post ID is missing or the deletion fails.
 * @fires deletePost
 * @modifies DOM - Updates the #userSuccess message and redirects on success.
 */


export async function onDeletePost(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const messageContainer = document.getElementById("userSuccess");
    messageContainer.style.display = "block";

    if (!id) {
        console.error("Post ID is required for deleting.");
        return;
    }

    try {
        const result = await deletePost(id);

        if (result.ok) {
        document.querySelector("#formContainer")?.remove(); // Hide content instantly
        // Redirect user to profile where profile posts are shown.
        messageContainer.innerHTML = "Post has been removed. Redirecting...";
        setTimeout(() => (window.location.href = "/index.html"), 1500);
        }
    } catch (error) {
        console.error("Error deleting post:", error);
        messageContainer.innerHTML =
        "Error removing post. Please try again or refresh the page.";
    }
}