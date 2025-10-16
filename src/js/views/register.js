import { onRegister } from "../ui/auth/register.mjs";
import { load } from "../utilities/storage.mjs";


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
 
  const form = document.getElementById("registerForm");
  if (form) {
    onRegister();
  } else {
    console.error("Error loading register functionality.");
  }
}

initializeRegister();