export function userNav() {
  const headerContainer = document.createElement("div");

  headerContainer.classList.add(
    "header",
  );

  const logoContainer = document.createElement("a");
  logoContainer.href = "./index.html";
  logoContainer.setAttribute("aria-label", "View home page");
  logoContainer.classList.add(
    "logo",
  );
  const logoImage = document.createElement("img");
  logoImage.src = "assets/logo/vinterst-logotype.svg";
  logoImage.alt = "Vinterest Logo";
  logoContainer.appendChild(logoImage);

  const pcNav = document.createElement("nav");
  pcNav.classList.add(
    "desktop-wrapper"
  );

  const exploreLink = document.createElement("a");
  exploreLink.setAttribute("aria-label", "View blog posts made by our community!");
  exploreLink.href = "/post/index.html";
  exploreLink.classList.add(
    "nav-link",
  );
  exploreLink.textContent = "Explore";

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

  const mobileNav = document.createElement("nav");
  mobileNav.classList.add("mobile-nav");
  const menuButton = document.createElement("button");
  menuButton.setAttribute("aria-label", "Open menu");
  menuButton.id = "menu-btn";
  menuButton.title = "Open menu";
  menuButton.classList.add(
    "material-symbols-sharp",
    "menu-button",
  );
  menuButton.textContent = "menu";

  const menuBox = document.createElement("ul");
  menuBox.classList.add(
    "menu-box",
  );

  menuButton.addEventListener("click", () => {
    const isOpen = menuBox.classList.toggle("nav-visible");
    menuButton.textContent = isOpen ? "close" : "menu";
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  const mobileExplore = document.createElement("li");
  const mobileExploreLink = document.createElement("a");
  mobileExploreLink.setAttribute("aria-label", "View blog posts made by our community!");
  mobileExploreLink.href = "/post/index.html";
  mobileExploreLink.textContent = "Explore Posts";
  mobileExploreLink.classList.add(
    "mobile-nav-link",
  );

  const mobileLogin = document.createElement("li");
  const mobileLoginLink = document.createElement("a");
  mobileLoginLink.setAttribute("aria-label", "Login");
  mobileLoginLink.href = "/account/login.html";
  mobileLoginLink.textContent = "Login";
  mobileLoginLink.classList.add(
    "mobile-nav-link",
  );

  const mobileRegister = document.createElement("li");
  const mobileRegisterLink = document.createElement("a");
  mobileRegisterLink.setAttribute("aria-label", "Register");
  mobileRegisterLink.href = "/account/register.html";
  mobileRegisterLink.textContent = "Register";
  mobileRegisterLink.classList.add(
    "mobile-nav-link",
  );

  pcNav.append(exploreLink, loginLink, registerLink);
  mobileExplore.appendChild(mobileExploreLink);
  mobileRegister.appendChild(mobileRegisterLink);
  mobileLogin.appendChild(mobileLoginLink);
  menuBox.append(mobileExplore, mobileLogin, mobileRegister);
  mobileNav.append(menuButton, menuBox);
  headerContainer.append(logoContainer, pcNav, mobileNav);

  return headerContainer;
}