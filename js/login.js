async function loginUser(url, userData) {
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
        const accessToken = json.data.accessToken;
        localStorage.setItem('accessToken', accessToken);

    } catch(error) {
        console.error(error);
    }
}

const userLogin = {
    email: "aggi.123@stud.noroff.no", // Required
    password: "aggi12345678" // Required
};

const loginUrl = `${API_BASE_URL}/auth/login`;

loginUser(loginUrl, userLogin);

async function getWithToken(url) {
    try {
        const token = localStorage.getItem('accessToken');
        console.log(token);
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        }

        const response = await fetch(url, fetchOptions);
        const json = await response.json();
        console.log(response);
        console.log(json);

    } catch (error) {
        console.log(error);
    }
}
const postsUrl = `${API_BASE_URL}/social/posts`;

getWithToken(postsUrl);