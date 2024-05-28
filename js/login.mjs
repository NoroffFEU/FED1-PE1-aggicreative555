
import { save, load } from "../js/storage.mjs";
import { updatePost } from "../js/posts/update.mjs";
import { createPostifLogged } from "../js/posts/create.mjs";
import { obtainApiKey } from "../js/authFetch.mjs";


// access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWdnaV8xMjMiLCJlbWFpbCI6ImFnZ2kuMTIzQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzE0Mzk0NTU3fQ.R4Bz9PZ4lbIdxO6n7bDEyCwvStDeq42yzdeJY1rYCS8

const API_BASE_URL = 'https://v2.api.noroff.dev';

export async function loginUser(url, userData) {
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }

        const response = await fetch(url, postData);
        const json = await response.json();

        // console.log('Response status:', response.status);

        // console.log(response);
        // console.log(json);

        if (response.status === 200) {
            const { accessToken, ...userDetails } = json.data;

            const { name } = userDetails;

            const profile = { ...userDetails, name };

            localStorage.setItem("accessToken", accessToken);
            save("profile", { ...userDetails, name });


            alert("Login successful!");
            // window.location.href = "../post/edit.html";

        } else {
            alert("Login failed. User doesn't exist");
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred during login. Please try again.");
    }
}

export function handleLogin() {
    
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    
    console.log('User input email:', loginEmail);
    console.log('User input password:', loginPassword);


    
    const userLogin = {
        email: loginEmail, 
        password: loginPassword 
    };


   
    const loginUrl = `${API_BASE_URL}/auth/login`;

    loginUser(loginUrl, userLogin);
}

document.getElementById('loginForm').addEventListener('submit', function(event) {

    event.preventDefault();
    
    handleLogin();
});

createPostifLogged();


// updatePost ({
//     id: "example-id UPDATE",
//     title: "Example UPDATE",
//     body: "Example UPDATE"
// })

// createPost ({
//     id: "example-id",
//     name: "example-name",
//     title: "Example",
//     body: "Example"
// })

// createPost()
// updatePost()
// removePost()
// getPost()
// getPosts()