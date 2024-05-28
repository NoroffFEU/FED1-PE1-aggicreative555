import { authFetch } from "../authFetch.mjs";
const API_BASE_URL = "https://v2.api.noroff.dev";

const action = "/blog/posts";
function parseSearchParams(searchParamsString) {
	const searchParamsArray = searchParamsString.split("&");

	if (searchParamsArray.length === 0) {
		return {};
	}

	const category = searchParamsArray[0];
	const id = searchParamsArray[1];

	const result = {
		category: category.slice(1),
		id: id,
	};

	return result;
}

const searchParamsString = window.location.search;
const parsedSearchParams = parseSearchParams(searchParamsString);

export async function updatePost(postData) {
	const updatePostUrl = `${API_BASE_URL}${action}/${parsedSearchParams.category}/${parsedSearchParams.id}`;
	console.log("updatePostUrl:", updatePostUrl);

	const response = await authFetch(updatePostUrl, {
		method: "put",
		body: JSON.stringify(postData),
	});

	return await response.json();
}
