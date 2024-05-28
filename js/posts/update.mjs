import { authFetch } from "../authFetch.mjs";

const API_BASE_URL = 'https://v2.api.noroff.dev';

const action = "/blog/posts";

export async function updatePost(postData) {

    if (!postData.id) {
        console.error("postData does not contain an id:", postData);
        return;
    }
    const updatePostUrl = `${API_BASE_URL}${action}/${postData.id}`;
    console.log("updatePostUrl:", updatePostUrl);
    

    const response = await authFetch(updatePostUrl, {
        method: "put",
        body: JSON.stringify(postData)
    })

   return await response.json();
}