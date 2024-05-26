import { load } from "../storage.mjs";
import { loginUser } from "../login.mjs";
import { handleLogin } from "../login.mjs";

const API_BASE_URL = 'https://v2.api.noroff.dev';

const action = "/social/posts";

export async function createPost(id) {
    const createPostUrl = API_BASE_URL + action;
    const token = load("token");

    const response = await fetch(createPostUrl, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bear ${token}`
        },
        body: JSON.stringify(postData)
    })

    const post = await response.json();

    console.log(post);
}

createPost ({
    title: "Example",
    body: "Example"
})