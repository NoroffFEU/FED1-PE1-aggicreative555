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
    if (!post.image || !post.image.url) {
      post.image = {
        url: "/",
        alt: "Placeholder image",
      };
    } else {
      console.error("No post image found")
    }
    const postElement = singlePost(post);
    container.appendChild(postElement);
  });
}