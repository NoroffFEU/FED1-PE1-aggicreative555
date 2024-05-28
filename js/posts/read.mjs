import { authFetch } from "../authFetch.mjs";

const action = "/blog/posts";

const API_BASE_URL = 'https://v2.api.noroff.dev';

export async function getPosts(name) {

    const updatePostUrl = `${API_BASE_URL}${action}/${postData.name}`;
    

    const response = await authFetch(updatePostUrl, {
        method: "get"
    })

    if (!postData.id) {
        console.error("postData does not contain an id:", postData);
        return;
    }

   return await response.json();
}

export async function getPost() {

    if (!postData.name || !postData.id) {
        console.error("postData must contain both name and id:", postData);
        return;
    }

    const getPostUrl = `${API_BASE_URL}${action}${id}/${postData.name}/${postData.id}`;
    

    const response = await authFetch(getPostUrl, {
        method: "get"
    })

   return await response.json();
}
