
import { authFetch } from "../authFetch.mjs";

const API_BASE_URL = 'https://v2.api.noroff.dev';

const action = "/blog/posts";

export async function createPost(postData) {

    if (!postData.name) {
        console.error("postData must contain name", postData);
        return;
    }

    const createPost = `${API_BASE_URL}${action}/${postData.name}`;

    console.log("createPost:", createPost);
    

    const response = await authFetch(createPost, {
        method: "post",
        body: JSON.stringify(postData)
    })

        const post = await response.json();
        return post;
}


const postData = {
    name: "example-post-name",
    title: "Example Title",
    body: "Example body content",
    tags: ["example", "post"],
    media: {
        url: "https://url.com/image.jpg",
        alt: "Example image description"
    }
};

createPost(postData).then(post => {
    console.log("Created Post:", post);
});