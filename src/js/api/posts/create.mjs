
import { load } from "../../utilities/storage.mjs";
import { API_POSTS } from "../constants.mjs";
import { headers } from "../headers.mjs";

/**
 * Creates a new post by sending the data to the API.
 *
 * @async
 * @function createPost
 * @param {Object} body - The post data to send.
 * @param {string} body.name - The name of the post (required).
 * @param {Object} [body.image] - Image object with URL and alt text.
 * @param {string} [body.image.url] - Image URL.
 * @param {string} [body.image.alt] - Alt text for image.
 * @returns {Promise<Object>} The created post data from the API.
 * @throws {Error} If the API request fails or server returns an error.
 *
 * @example
 * const post = {
 *   name: "My day",
 * 	 body: "I ate oatmeal today"
 *   image: {
 *     url: "https://example.com/image.jpg",
 *     alt: "A bowl of oatmeal"
 *   }
 * };
 * const response = await createPost(post);
 * console.log(response); // Outputs created post data
 */

export async function createPost(body) {
	const user = load("user");
	const username = user?.name;
	const url = new URL(`${API_POSTS}/${username}`);
	const response = await fetch(url, {
		method: "POST",
		headers: headers({ authRequired: true }),
		body: JSON.stringify(body),
	});

	const post = await response.json();
	console.log('postdata:', post);

	if (!response.ok) {
		console.error(`Failed to create post:${post?.message}`);
		throw new Error(post?.message || "API request failed");
	}

	return post;
	}