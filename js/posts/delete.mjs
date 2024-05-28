import { authFetch } from "../authFetch.mjs";

const action = "/blog/posts";

const API_BASE_URL = 'https://v2.api.noroff.dev';

export async function removePost() {

    const updatePostUrl = `${API_BASE_URL}${action}/${id}`;
    console.log("updatePostUrl:", updatePostUrl);
    

    const response = await authFetch(updatePostUrl, {
        method: "delete"
    })

    if (!postData.id) {
        console.error("postData does not contain an id:", postData);
        return;
    }

   return await response.json();
}