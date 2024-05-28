import { authFetch } from "../authFetch.mjs";
import { load } from "../storage.mjs";
const action = "/blog/posts";
const profile = JSON.parse(load("profile"));

const API_BASE_URL = "https://v2.api.noroff.dev";

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
export async function getPost() {
	const getPostUrl = `${API_BASE_URL}${action}/${parsedSearchParams.category}/${parsedSearchParams.id}`;

	const response = await authFetch(getPostUrl, {
		method: "get",
	});

	return await response.json();
}

