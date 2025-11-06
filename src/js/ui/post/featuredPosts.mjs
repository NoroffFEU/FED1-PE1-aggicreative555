import { readPost } from "../../api/posts/read.mjs";
import { singlePost } from "./singlePost.mjs";

/**
 * Fetch and display 3 featured posts on the homepage.
 * @async
 * @function renderFeaturedPosts
*/


export async function renderFeaturedPosts() {
    const container = document.getElementById("postsContainer");
    if (!container) {
        console.error("No #postsContainer found in DOM");
    }

    container.classList.add("post-wrapper");
    container.innerHTML = "";

    const featuredIds = ["3dee11dc-38fb-441e-9595-9d694af6fac1", "8adedd62-7f76-4a43-a8cc-f63c342713f7", "537fe0fb-55d8-4dcc-b344-b2287f26a05e"];

    for (const id of featuredIds) {
        try {
            const post = await readPost(id);
            const postElement = singlePost(post);
            container.append(postElement)
        } catch (error) {
            console.error(`Error rendering featured post ${id}`, error);
    
            if (container) {
                container.innerHTML = `<p class="txt-color-red subtitle-2">Unable to load featured posts. Please refresh the page.</p>`
            }
        }
    }
}
