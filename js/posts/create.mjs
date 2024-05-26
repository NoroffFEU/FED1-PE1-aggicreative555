
import { loginUser } from "../login.mjs";
import { handleLogin } from "../login.mjs";
import { authFetch } from "../authFetch.mjs";

const API_BASE_URL = 'https://v2.api.noroff.dev';

const action = "/social/posts";

export async function createPost(postData) {
    const createPostUrl = API_BASE_URL + action;
    

    const response = await authFetch(createPostUrl, {
        method: "post",
        body: JSON.stringify(postData)
    })

    const post = await response.json();

    console.log(post);
}

