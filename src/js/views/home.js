import { navToggler } from "../ui/nav/navToggler.mjs";

async function initializeHome() {
  const header = document.getElementById("header");
  if (header) {
    navToggler();
  } else {
    console.error("No #header element located in the DOM");
  }

}

initializeHome();