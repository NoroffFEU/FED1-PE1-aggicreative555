/**
 * Attaches real-time validation to an input field with dynamic accessibility and visual feedback.
 *
 * This function listens for `input` events and validates the input value using the provided test function.
 * If the value is invalid, it sets the `aria-invalid` attribute, applies red border styling,
 * and displays an error message in a sibling element with the class `error-message`.
 *
 * The input should be followed directly by a <p class="error-message"> element for error display.
 *
 * @param {HTMLInputElement | HTMLTextAreaElement} input - The input element to validate.
 * @param {Function} testFn - A function that receives the input's value and returns `true` if valid, `false` otherwise.
 * @param {string} errorMessage - The error message to display when validation fails.
 *
 * @example
 * validateField(document.getElementById("email"), isValidEmail, "Please enter a valid email address.");
 */

export function validateField(input, testFn, errorMessage) {
  input.addEventListener("input", () => {
    const isValid = testFn.length === 0 ? testFn() : testFn(input.value);
    input.setAttribute("aria-invalid", !isValid);
    input.classList.toggle("outline-correct", isValid);
    input.classList.toggle("outline-error", !isValid);

    const errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains("error-message")) {
      if (!isValid) {
        errorEl.innerHTML = `${errorMessage}`;
      } else {
        errorEl.textContent = "";
      }
    }
  });
}