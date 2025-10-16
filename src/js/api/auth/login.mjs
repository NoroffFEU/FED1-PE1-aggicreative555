/**
 * Logs in a user using the provided credentials.
 *
 * Displays a success message and logs the user in on success.
 * Displays relevant validation errors returned from the API on failure.
 *
 * @async
 * @function login
 * @param {Object} body - The login data from the form.
 * @param {string} body.email - The user's email address.
 * @param {string} body.password - The user's password.
 * @returns {Promise<void>} Resolves when login is successful and data is saved.
 * @throws {Error} If the login request fails or the server returns an error.
 *
 * @example
 * await login({ email: "user@example.com", password: "password123" });
 */

import { save } from "../../utilities/storage.mjs";
import { API_AUTH_LOGIN } from "../constants.mjs";
import { headers } from "../headers.mjs";


export async function login({ email, password }) {
  const body = JSON.stringify({ email, password });

  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: headers({ authRequired: false, apiKeyRequired: false }),
      body,
    });

    const result = await response.json();
    const userSuccess = document.getElementById("userSuccess");
    const errorMessage =
      `Login failed. ${result?.errors?.[0]?.message}. Please try again.` ||
      `Login failed. ${result?.message}. Please try again.` ||
      "Login failed. Please check that all fields are filled in correctly and try again.";

    if (userSuccess) {
      userSuccess.innerHTML = ""; // Clear
    }

    if (response.ok) {
      userSuccess.classList.remove("invisible");
      userSuccess.innerHTML = `Login sucessful! Redirecting to home page...`;
        setTimeout(() => {
        window.location.href = "/";
        }, 1000);
    } else {
      userSuccess.classList.remove("invisible");
      userSuccess.innerHTML = errorMessage;

      setTimeout(() => {
        userSuccess.classList.add("invisible");
        userSuccess.innerHTML = ""; // Clear
      }, 2000);
    }

    const {
      data: { apiKey, accessToken, name, ...restUserData },
    } = result;

    save("accessToken", accessToken);
    save("userName", name);
    save("user", { name, ...restUserData });

  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}