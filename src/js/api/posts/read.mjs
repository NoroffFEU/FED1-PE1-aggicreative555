import { load } from "../../utilities/storage.mjs";
import { API_POSTS } from "../constants.mjs";
import { headers } from "../headers.mjs";

/**
 * Fetches multiple posts/listings with options for pagination, sorting, and filtering.
 * @async
 * @function readPosts
 * @param {Object} options - Options for fetching posts.
 * @param {number} [options.limit=12] - Max number of posts to return.
 * @param {number} [options.page=1] - Page number for pagination.
 * @param {string} [options.sort='created'] - Field to sort by.
 * @param {string} [options.sortOrder='desc'] - Sort order, 'asc' or 'desc'.
 * @param {boolean} [options.active=true] - Whether to filter by active posts.
 * @returns {Promise<Array>} Array of posts sorted by created date.
 * @throws {Error} If the API call fails.
 */


export async function readPosts({
  page,
  limit,
  offset,
  sort,
  tag,
  author,
} = {}) {

  try {
    const user = load("user");
    const username = user?.name || "vinterest_1";
    const url = new URL(`${API_POSTS}/${username}`);

    if (page) url.searchParams.append("page", page);
    if (limit) url.searchParams.append("limit", limit);
    if (offset) url.searchParams.append("offset", offset);
    if (sort) url.searchParams.append("sort", sort);
    if (tag) url.searchParams.append("tag", tag);
    if (author) url.searchParams.append("author", author);

    const response = await fetch(url, {
      headers: headers({ authRequired: false, apiKeyRequired: false }),
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const { data = [],  meta = {} } = await response.json();
    return {data, meta};
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

/**
 * Reads a single post by its ID.
 *
 * @async
 * @function readPost
 * @param {string|number} id - The ID of the post to read.
 * @returns {Promise<object>} The post data.
 * @throws {Error} If the API request fails or the ID is missing.
 *
 * @example
 * const post = await readPost(123);
 * console.log(post); // Outputs post data with ID 123
 */

export async function readPost(id) {
  const user = load("user");
  const username = user?.name || "vinterest_1";
  if (!id) {
    throw new Error("Post ID is required.");
  }

  const url = new URL(`${API_POSTS}/${username}/${id}`);

  const response = await fetch(url.toString(), {
    headers: headers({ apiKeyRequired: false }),
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to read post with ID ${id}: ${response.statusText}`,
    );
  }

  const { data = [] } = await response.json();
  return data;
}