import { postIdTemplate } from "./postId.mjs";
import { singlePost } from "./singlePost.mjs";

export function renderMultiplePosts(posts) {
  const container = document.getElementById("postsContainer");
  if (!container) {
    console.error(`Container with ID '${postsContainer}' not found.`);
    return;
  }
  container.innerHTML = "";

  container.classList.add(
    "post-wrapper"
  );

  posts.forEach((post) => {
    console.log(post);
    const postElement = singlePost(post);
    container.appendChild(postElement);
  });
}