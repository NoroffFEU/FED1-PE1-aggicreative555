import { readPosts } from "../../api/posts/read.mjs";
import { renderMultiplePosts } from "./renderPost.mjs";


/**
 * Load multiple posts for a given page number and update pagination UI.
 *
 * @async
 * @function loadMultiplePosts
 * @param {number} [page=1] - The page number to load posts for.
 * @returns {Promise<void>}
 *
 * @example
 * loadMultiplePosts(2);
 *
 * @throws Will log an error to the console if fetching posts fails.
 */

let currentPage = 1;
let totalPages = 10;

export async function loadMultiplePosts() {
    try {
        const posts = await readPosts({ });
        renderMultiplePosts(posts);
        updatePagination();
    } catch (error) {
        console.error("Failed to load posts:", error);
    }
}

/**
 * Update the pagination UI based on the current page and total pages.
 *
 * @function updatePagination
 * @returns {void}
 *
 * @example
 * updatePagination();
 *
 * @throws Will not throw but assumes 'pageNumbers', 'prevPage', 'nextPage' elements exist in the DOM.
 */

export function updatePagination() {
  const pageNumbersContainer = document.getElementById("pageNumbers");
  pageNumbersContainer.innerHTML = "";
  pageNumbersContainer.className = "flex-S-row";

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.className = `${
      i === currentPage
        ? "btn-XS underline"
        : "btn-XS txt-color-grey "
    }`;

    pageButton.addEventListener("click", () => {
      loadMultiplePosts(i);
      window.scrollTo({
        top: 50,
        behavior: "smooth",
      });
    });

    pageNumbersContainer.appendChild(pageButton);
  }

  document.getElementById("prevPage").disabled = currentPage === 1;

  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

/**
 * Set up event listeners for pagination navigation (Prev/Next buttons).
 *
 * @function setupPagination
 * @returns {void}
 *
 * @example
 * setupPagination();
 *
 * @throws Will not throw but assumes 'prevPage' and 'nextPage' elements exist in the DOM.
 */
export function setupPagination() {
  document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < totalPages) {
      loadMultiplePosts(currentPage + 1);
    }
  });

  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      loadMultiplePosts(currentPage - 1);
    }
  });
}