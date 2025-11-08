import { readPosts } from "../../api/posts/read.mjs";
import { renderMultiplePosts } from "./renderPost.mjs";


const POSTS_PER_PAGE = 12;
let totalPages = 1;
let currentPage = 1;

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
 * @description
 * Fetches posts from the API with pagination parameters.
 * Renders them using `renderMultiplePosts()` and updates the pagination UI
 * with `updatePagination()`. Always loads 12 posts per page.
 *
 * @throws {Error} Logs an error if the API request fails.
*/

export async function loadMultiplePosts(page = 1) {
  try {
    currentPage = page;
    const { data, meta } = await readPosts({ page, limit: POSTS_PER_PAGE });

    if (meta.totalCount) {
      totalPages = Math.ceil(meta.totalCount / POSTS_PER_PAGE);
    } else  {
      totalPages = Math.ceil(data.length / POSTS_PER_PAGE) || 1;
    }

    renderMultiplePosts(data);
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
        ? "page-button page-underline"
        : "page-button"
    }`;

    pageButton.disabled = i === currentPage;

    pageButton.addEventListener("click", () => {
      if ( i !== currentPage) {
        loadMultiplePosts(i);
        window.scrollTo({
          top: 50,
          behavior: "smooth",
        });
      }
    });

    pageNumbersContainer.appendChild(pageButton);
  }
}