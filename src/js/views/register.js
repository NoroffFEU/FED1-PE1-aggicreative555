import { onRegister } from "../ui/auth/register.mjs";
import { navToggler } from "../ui/nav/navToggler.mjs";


/**
 * Function initalizes register functionality on the register page specifically.
 * @function initializeRegister
 */


function initializeRegister() {
  const token = localStorage.getItem("accessToken");
  if (token) {
    alert("You are already using your account, log out to create a new user.");
    setTimeout(() => {
      window.location.href = "/profile/";
    }, 1000);
  }

  const header = document.getElementById("header");
  if (header) {
    navToggler();
  } else {
    console.error("No #header element located in the DOM");
  }
 
  const form = document.getElementById("registerForm");
  if (form) {
    onRegister();
  } else {
    console.error("Error loading register functionality.");
  }
}

initializeRegister();