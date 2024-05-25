// const http = require('http');
// const bcrypt = require('bcryptjs');
// const fs = require('fs');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello, World!\n');
// });

// const PORT = 3000;

// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// const usernameValue = document.getElementById('username').value;
// const passwordValue = document.getElementById('password').value;


// const validateInputs = () => { 
//     if(usernameValue === '') {
//         console.log('Username is needed');
//     } else {
//         console.log('Success');
//     }

//     if(passwordValue === '') {
//         console.log('Password is needed');

//     } else if (passwordValue.length < 8 ) {
//         console.log('Password must be at least 8 characters')
//     } else {
//         console.log('Success');
//     }

//     return true;
// }

// document.getElementById('registerForm').addEventListener('submit', async (e) => {
//     e.preventDefault(); 

//     const validValue = validateInputs(usernameValue, passwordValue);
//     if (!validValue) {
//         console.error('Invalid username or password');
//         return;
//     }
    
//     const registerSuccess = await registerUser(usernameValue, passwordValue);
//     if (registerSuccess) {
//         console.log('User registered successfully');
//         localStorage.setItem('token', token);
//     } else {
//         console.error('Registration failed');
//     }
// });

// function hashPassword(password) {
//     const saltRounds = 10;
//     return bcrypt.hashSync(password, saltRounds);
// }

// async function registerUser(usernameValue, passwordValue) {
//     const hashedPassword = hashPassword(passwordValue);
    
//     const requestBody = {
//         username: usernameValue,
//         password: hashedPassword
//     };
    
//     try {
//         const response = await fetch('http://127.0.0.1:3000/account/register.html', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(requestBody)
//         });
        
//         if (!response.ok) {
//             console.error('Failed to register user:', response.statusText);
//             return false;
//         }
        
//         return true;
//     } catch (error) {
//         console.error('Error registering user:', error);
//         return false;
//     }
// }

// async function getToken() {
//     try {
//         const response = await fetch('/auth/token', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },

//         });

//         if (!response.ok) {
//             throw new Error('Failed to retrieve token');
//         }

//         const data = await response.json();
//         const token = data.token;

//         localStorage.setItem('token', token);

//         console.log('Token retrieved and stored', token);
//     }

//     catch (error) {
//         console.error('Error retrieving token:', error);
//     }
// }

// getToken();


// async function registerUser(username, password) {
//     let userData;

//     try {
//         userData = JSON.parse(fs.readFileSync('users.json', 'utf8'));
//     } catch (error) {
//         userData = [];
//     }

//     const existingUser = userData.find(user => user.username === username );
//     if (existingUser) {
//         console.error('Username already exists');
//         return false;
//     }

//     const hashedPassword = hashPassword(password);

//     const newUser = {
//         username: username,
//         passwordHash: hashedPassword
//     };

//     userData.push(newUser);

//     fs.writeFileSync('users.json', JSON.stringify(userData, null, 2));

//     console.log('User registred successfully');
//     return true;
// }




const API_BASE_URL = 'https://v2.api.noroff.dev';
const registerUrl = `${API_BASE_URL}/auth/register`;

/**

*@param {string} url
*@param {any} user

*```js


*```
*/



async function registerUser(registerUrl, userData) {
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };
        
        const response = await fetch(registerUrl, postData);
        // console.log('HTTP response status:', response.status);
        // console.log('HTTP response:', response);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`HTTP error! status: ${response.status}, text: ${errorText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        console.log('Server Response:', json);
        
        if (json.success || response.status === 201) {
            
            alert('Registration successful! You will be redirected to the login page.');
            window.location.href = '../account/login.html';

        } else {
            alert('Registration failed: ' + (json.message || 'No message provided'));
        }
        
        } catch (error) {
            console.error('Error:', error);
        alert('An error occurred during registration. Please try again later.');
    }
}



document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const registerName = document.getElementById('registerName').value;
    const registerEmail = document.getElementById('registerEmail').value;
    const registerPassword = document.getElementById('registerPassword').value;

    
    const userRegister = {
        email: registerEmail, 
        name: registerName, 
        password: registerPassword
    };
    
    await registerUser(registerUrl, userRegister);

});



