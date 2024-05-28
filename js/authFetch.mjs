import { load, save } from "../js/storage.mjs";

const API_KEY_URL = 'https://v2.api.noroff.dev/auth/create-api-key';

export async function obtainApiKey() {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        throw new Error('Access token not found. Please log in first.');
    }

    try {
        const response = await fetch(API_KEY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ name: 'My API Key name' })
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`Failed to obtain API key, status: ${response.status}, details: ${JSON.stringify(errorDetails)}`);
        }

        const json = await response.json();
        if (json.data && json.data.key) {
            const apiKey = json.data.key;
            localStorage.setItem('apiKey', apiKey);
            return apiKey; 
        } else {
            throw new Error('API key not found in response');
        }
    } catch (error) {
        console.error('Error obtaining API key:', error);
        throw error; 
    }
}

obtainApiKey();

export function headers() {
    const accessToken = load("accessToken");
    const apiKey = obtainApiKey();

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey
    }
}

export async function authFetch(url, options) {
    return fetch(url, {
        ...options,
        headers: headers()
    })
}