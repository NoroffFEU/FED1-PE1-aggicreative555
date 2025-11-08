import { API_AUTH_REGISTER } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { login } from "./login.mjs";

/**
 * Registers a new user with the provided details.
 *
 * Displays a success message and logs the user in on success.
 * Displays relevant validation errors returned from the API on failure.
 *
 * @param {Object} data - The registration data.
 * @param {string} data.name - The user's name (required).
 * @param {string} data.email - The user's email address (required).
 * @param {string} data.password - The user's password (required).
 *
 * @returns {Promise<Object>} A promise that resolves to the user's registration response.
 *
 * @throws {Error} If the registration fails.
 *
 * @example
 * const profile = {
 * name = "user1",
 * email = "user@example.com",
 * password = "password1234"
 * };
 * const response = await register(profile);
 * console.log(response) // Outputs successful registration response.
 */


export async function register({ name, email, password }) {
  const body = JSON.stringify({ name, email, password });

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: headers({ authRequired: false ,apiKeyRequired: false }),
      body,
    });

    const result = await response.json();
    const userSuccess = document.getElementById("userSuccess");
    const errorMessage =
      `Registration failed. ${result?.errors?.[0]?.message}. Please try again.` ||
      `Registration failed. ${result?.message}. Please try again.` ||
      "Registration failed. Please check that all fields are filled in correctly and try again.";

    if (userSuccess) {
      userSuccess.innerHTML = ""; // Clear
    }

    if (response.ok) {
      userSuccess.classList.remove("invisible");
      userSuccess.classList.add("message-container");
      userSuccess.innerHTML = "";
      userSuccess.innerHTML = `User created successfully, logging in...`;
      setTimeout(() => {
        login({ email, password });
      }, 2000);
      return result;
    } else {
      userSuccess.classList.remove("invisible");
      userSuccess.classList.add("message-container");
      userSuccess.innerHTML = "";
      userSuccess.innerHTML = errorMessage;

      setTimeout(() => {
        userSuccess.classList.add("invisible");
        userSuccess.classList.remove("message-container");
        userSuccess.innerHTML = "";
        userSuccess.innerHTML = ""; // Clear
      }, 4000);
    }
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}
