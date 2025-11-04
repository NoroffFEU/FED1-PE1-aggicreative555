import { onLogin } from "../ui/auth/login.mjs";
import { navToggler } from "../ui/nav/navToggler.mjs";
/**
 * Function initalizes login functionality on the login page specifically.
 * @function initializeLogin
 */

function initializeLogin() {
  const token = localStorage.getItem("accessToken");
  if (token) {
    alert("You are already logged in");
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1000);
  }
  const header = document.getElementById("header");
  if (header) {
    navToggler();
  } else {
    console.error("No #header element located in the DOM");
  }

  const form = document.getElementById("loginForm");
    if (form) {
      onLogin();
    } else {
      console.error("Form #loginForm not found in DOM");
    }
}

initializeLogin();