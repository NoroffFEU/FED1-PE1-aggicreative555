import { register } from "../../api/auth/register.mjs";
import { validateField } from "../global/validateField.mjs";
import { isValidConfirmPassword, isValidEmail, isValidPassword, isValidUserName } from "../global/validators.mjs";

/**
 * Initializes validation and handles submission for the register form.
 * Validates all inputs with real-time feedback, including confirm password matching.
 * Prevents confirm password from being sent to the API.
 * Disables the submit button during submission to avoid duplicate requests.
 *
 *
 * @function onRegister
 * @param {Event} event - Form submission event.
 * @throws {Error} If register form is missing in the DOM.
 */

export function onRegister() {
  const form = document.querySelector("#registerForm");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  if (form) {
    validateField(
      usernameInput,
      isValidUserName,
      "Please create a username that includes letters, numbers and / or dashes. Max 30 characters.",
    );
    validateField(
      emailInput,
      isValidEmail,
      "Please write an email that is a valid noroff.no or stud.noroff.no email.",
    );
    validateField(
      passwordInput,
      isValidPassword,
      "The password must be 8 – 30 characters and can include special characters.",
    );
    validateField(
      confirmPasswordInput,
      isValidConfirmPassword(confirmPasswordInput, passwordInput),
      "Passwords must match",
    );

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');

      if (!submitButton) {
        console.error("Submit button not found");
        return;
      }

      // Disable submit to prevent spamming.
      submitButton.disabled = true;
      submitButton.textContent = "Registering user...";

      const formData = new FormData(form);
      const name = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");

      try {
        await register({ name, email, password });
        form.reset();
      } catch (error) {
        console.error("Error registering user:", error);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Register";
      }
    });
  } else {
    console.error("Register form not found");
  }
}