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
