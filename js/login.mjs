import { load } from "../js/storage.mjs";
import * as storage from "../js/storage.mjs";
import { updatePost } from "../js/posts/create.mjs";



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

        console.log(response);
        console.log(json);

        if (json.response.status) {
            const { accessToken, ...userDetails } = await response.json()
            localStorage.setItem('accessToken', accessToken)
            save("profile", userDetails)

            alert("Login successful!");
            window.location.href = '../post/edit.html';
        } else {
            alert("Login failed. User doesn't exist");
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred during login. Please try again.");
    }
}

// async function getWithToken(url) {
//     try {
//         const token = localStorage.getItem('accessToken');
//         console.log(token);
//         const fetchOptions = {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`, 
//             },
//         }

//         const response = await fetch(url, fetchOptions);
//         const json = await response.json();
//         console.log(response);
//         console.log(json);

//     } catch (error) {
//         console.log(error);
//     }
// }


export function handleLogin() {
    
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    
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

// const postsUrl = `${API_BASE_URL}/auth/login`;

// getWithToken(postsUrl);

updatePost ({
    id: "example-id",
    title: "Example",
    body: "Example"
})