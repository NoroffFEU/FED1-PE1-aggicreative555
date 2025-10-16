import { API_KEY } from "./constants.mjs";
/**
 * Generates HTTP headers for API requests, including Content-Type, Authorization, and API key.
 *
 * @function headers
 * @param {Object} options
 * @param {boolean} [options.authRequired=false] - Whether auth token is required.
 * @param {boolean} [options.apiKeyRequired=true] - Whether API key is required.
 * @returns {Headers} The configured headers object.
 * @throws {Error} If the access token or API key is missing and required.
 */
export function headers({ authRequired = false, apiKeyRequired = false } = {}) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  // Only append API key if required
  if (apiKeyRequired && API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  } else if (apiKeyRequired && !API_KEY) {
    throw new Error("API Key is missing.");
  }

  // Only append Auth token if required
  if (authRequired) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    } else {
      throw new Error("Authorization token is missing.");
    }
  }

  return headers;
}