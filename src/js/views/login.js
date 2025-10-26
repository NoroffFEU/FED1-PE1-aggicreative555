import { onLogin } from "../ui/auth/login.mjs";
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

  const form = document.getElementById("loginForm");
    if (form) {
      onLogin();
    } else {
      console.error("Form #loginForm not found in DOM");
    }
}

initializeLogin();