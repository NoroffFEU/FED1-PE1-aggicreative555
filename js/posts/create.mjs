
import { authFetch } from "../authFetch.mjs";
import { load } from "../storage.mjs";
const API_BASE_URL = "https://v2.api.noroff.dev";

const action = "/blog/posts";
const profile = JSON.parse(load("profile"));
console.log(profile);
export async function createPost(postData) {
	if (!postData.name) {
		console.error("postData must contain name", postData);
		return;
	}

	const createPost = `${API_BASE_URL}${action}/${postData.name}`;

	console.log("createPost:", createPost);

	const response = await authFetch(createPost, {
		method: "post",
		body: JSON.stringify(postData),
	});

	const post = await response.json();
	return post;
}

document
	.getElementById("createPostForm")
	.addEventListener("submit", async (e) => {
		e.preventDefault();

		const postTitle = document.getElementById("postTitle").value;
		const postBody = document.getElementById("postBody").value;
		const postImageUrl = document.getElementById("postImageUrl").value;
		const postImageAlt = document.getElementById("postImageAlt").value;

		const postData = {
			name: profile.name,
			title: postTitle,
			body: postBody,
			tags: ["example", "post"],
			media: {
				url: postImageUrl,
				alt: postImageAlt,
			},
		};

		createPost(postData);
	});
