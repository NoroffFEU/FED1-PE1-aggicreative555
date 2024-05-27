
import { loginUser } from "../login.mjs";
import { handleLogin } from "../login.mjs";
import { authFetch } from "../authFetch.mjs";

const API_BASE_URL = 'https://v2.api.noroff.dev';

const action = "/social/posts";

export async function updatePost(postData) {
    const updatePostUrl = `${API_BASE_URL}${action}/${postData.id}`;
    console.log("updatePostUrl:", updatePostUrl);
    

    const response = await authFetch(updatePostUrl, {
        method: "post",
        body: JSON.stringify(postData)
    })

    if (!postData.id) {
        console.error("postData does not contain an id:", postData);
        return;
    }

    const post = await response.json();

    console.log(post);
}