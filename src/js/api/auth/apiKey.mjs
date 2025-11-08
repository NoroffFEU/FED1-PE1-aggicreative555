import { API_KEY_FETCH } from "../constants.mjs";
import { headers } from "../headers.mjs";

export async function createApiKey(accessToken) {
    const response = await fetch(`${API_KEY_FETCH}`, {
        method: "POST",
        headers: headers({ authRequired: true, apiKeyRequired: false }),
        body,
    });

    const result = await response.json();

    if(!response.ok) throw new Error(result.message);

    return result.data.key; 
}