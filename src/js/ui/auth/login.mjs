import { login } from "../../api/auth/login.mjs";
import { validateField } from "../global/validateField.mjs";
import { isValidEmail, isValidPassword } from "../global/validators.mjs";

/**
 * Initializes validation and handles submission for the register form.
 * Validates all inputs with real-time feedback, including confirm password matching.
 * Prevents confirm password from being sent to the API.
 * Disables the submit button during submission to avoid duplicate requests.
 *
 * @function onLogin
 * @param {Event} event - Form submission event.
 * @throws {Error} If the login form is not found in the DOM.
 */


export function onLogin() {
  const form = document.querySelector("#loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (form) {
    validateField(
      emailInput,
      isValidEmail,
      "Must be a valid noroff.no or stud.noroff.no email.",
    );
    validateField(
      passwordInput,
      isValidPassword,
      "Password must be 8–30 characters.",
    );

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Disable submit to prevent spamming.
      const submitButton = form.querySelector('button[type="submit"]');

      if (!submitButton) {
        console.error("Submit button not found", error);
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = "Logging in...";

      const formData = new FormData(form);
      const email = formData.get("email");
      const password = formData.get("password");

      try {
        await login({ email, password });
        return false;
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Login";
        form.reset();
      }
    });
  } else {
    console.error("Error submitting login information");
  }
}