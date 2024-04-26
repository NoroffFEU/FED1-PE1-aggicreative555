const http = require('http');
const bcrypt = require('bcryptjs');
const fs = require('fs');

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    const usernameValue = document.getElementById('username').value;
    const passwordValue = document.getElementById('password').value;

    const validValue = validateInputs(username, password);
    if (!valid) {
        console.error('Invalid username or password');
        return;
    }
    
    const registerSuccess = await registerUser(username, password);
    if (registerSuccess) {
        console.log('User registered successfully');
    } else {
        console.error('Registration failed');
    }
});


const validateInputs = () => {
    

    if(usernameValue === '') {
        console.log('Username is needed');
    } else {
        console.log('Success');
    }

    if(passwordValue === '') {
        console.log('Password is needed');

    } else if (passwordValue.length < 8 ) {
        console.log('Password must be at least 8 characters')
    } else {
        console.log('Success');
    }
}

validateInputs();


async function registerUser(username, password) {
    const hashedPassword = hashPassword(password);
    
    const requestBody = {
        username: username,
        password: hashedPassword
    };
    
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            console.error('Failed to register user:', response.statusText);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error registering user:', error);
        return false;
    }
}

function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}



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

