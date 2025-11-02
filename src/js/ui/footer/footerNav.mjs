import { load } from "../../utilities/storage.mjs";

export function footerNav() {
  const isLoggedIn = load("accessToken");

  const footerContainer = document.createElement("div");
  footerContainer.classList.add(
    'footer'
  );

  const logoContainer = document.createElement("a");
  logoContainer.href = "/index.html";
  logoContainer.setAttribute("aria-label", "View home page");
  logoContainer.classList.add(
    "logo-footer",
  );
  const logoImage = document.createElement("img");
  logoImage.src = "/assets/logo/vinterest-logo-mono.svg";
  logoImage.alt = "Vinterest logo";
  logoContainer.appendChild(logoImage);

  const itemContainer = document.createElement("div");
  itemContainer.classList.add(
    "footer-container"
  );

  const exploreLink = document.createElement("a");
  exploreLink.setAttribute("aria-label", "View blog posts made by our community!");
  exploreLink.href = "/posts/index.html";
  exploreLink.classList.add(
    "nav-link",
  );
  exploreLink.textContent = "Explore";

  const createLink = document.createElement("a");
  createLink.setAttribute("aria-label", "Create a Post");
  createLink.href = "/post/create.html";
  createLink.classList.add(
    "nav-link",
  );
  createLink.textContent = "Create";


  const loginLink = document.createElement("a");
  loginLink.setAttribute("aria-label", "Login");
  loginLink.href = "/account/login.html";
  loginLink.classList.add(
    "nav-link",
  );
  loginLink.textContent = "Login";

  const registerLink = document.createElement("a");
  registerLink.setAttribute("aria-label", "register");
  registerLink.href = "/account/register.html";
  registerLink.classList.add(
    "nav-link",
  );
  registerLink.textContent = "Register";


  const footer = document.createElement("div");
  footer.classList.add(
   'footer-container'
  );

  const copyRight = document.createElement("p");
  copyRight.classList.add("caption");
  copyRight.textContent = "©2025 Vinterest. All rights reserved.";

  const termsPrivacyContainer = document.createElement("div");
  const termsOfUse = document.createElement("a");
  termsOfUse.textContent = "Terms of Use";
  termsOfUse.classList.add("caption", "margin-i-S");
  const privacyPolicy = document.createElement("a");
  privacyPolicy.classList.add("caption", "margin-i-S");
  privacyPolicy.textContent = "Privacy Policy";

  termsPrivacyContainer.append(termsOfUse, privacyPolicy);
  footerContainer.append(logoContainer, itemContainer, footer);
  itemContainer.append(createLink, exploreLink, loginLink, registerLink);
  footer.append(termsPrivacyContainer, copyRight);

  if (isLoggedIn) {
    createLink.style.visibility = "block";
    loginLink.style.visibility = "hidden";
    registerLink.style.visibility = "hidden";
  } else {
    createLink.style.visibility = "hidden";
    loginLink.style.visibility = "block";
    registerLink.style.visibility = "block";
  }

  return footerContainer;
}