import { navToggler } from "../ui/nav/navToggler.mjs";
import { renderFeaturedPosts } from "../ui/post/featuredPosts.mjs";

async function initializeHome() {
  const header = document.getElementById("header");
  if (header) {
    navToggler();
  } else {
    console.error("No #header element located in the DOM");
  }

  const postsContainer = document.getElementById("postsContainer");
  if (postsContainer) {
    const title = document.getElementById("postsTitle");
    title.classList.add("display-XL", "centered", "underline", "margin-top-32");
    title.textContent = "Featured Posts";
    await renderFeaturedPosts();
  }

}

initializeHome();