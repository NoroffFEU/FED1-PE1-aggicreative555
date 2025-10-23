import { readPost, readPosts } from "../api/posts/read.mjs";
import { navToggler } from "../ui/nav/navToggler.mjs";
import { loadMultiplePosts, setupPagination } from "../ui/post/pagination.mjs";
import { postIdTemplate } from "../ui/post/postId.mjs";
import { renderMultiplePosts } from "../ui/post/renderPost.mjs";
import { save } from "../utilities/storage.mjs";

/**
 * @async
 * Loads and renders post data based on the current URL.
 *
 * - If no `id` is found in the URL, this function fetches and displays all posts.
 * - If an `id` is present (`?id=<postId>`), it fetches and displays a single post,
 *   along with "Go Back" and "Share pet" buttons for user interaction.
 *
 * Displays an error message on the page if something goes wrong.
 *
 * @function loadPosts
 * @returns {Promise<void>}
 */


export async function loadPosts() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  if (header && footer) {
    navToggler();
  } else {
    console.error("No #footer or #header element located in the DOM");
  }

  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");
  const container = document.getElementById("postsContainer");
  const message = document.getElementById("userSuccess");

  if (!container) {
    console.error("No #postsContainer found in the DOM.");
    return;
  }

  try {
    if (!postId) {
        const posts = await readPosts();
        renderMultiplePosts(posts);
        loadMultiplePosts();
        setupPagination();
        save("cachedPosts", JSON.stringify(posts));
    } else if (postId) {
        const pagination = document.getElementById("pagination");
        pagination.style.visibility = "hidden";
        const post = await readPost(postId);
        container.innerHTML = "";
        container.appendChild(postIdTemplate(post));

    }
  } catch (error) {
    console.error("Error loading post(s):", error);
    message.classList.remove("invisible");
    message.innerHTML =
      "Something went wrong loading posts.Refresh the page...";
  }
}

loadPosts();