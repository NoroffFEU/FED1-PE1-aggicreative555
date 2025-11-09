import { setLogoutListener } from "../../utilities/logout.mjs";

export function adminNav() {
  const headerContainer = document.createElement("div");

  headerContainer.classList.add(
    "header",
  );

  const logoContainer = document.createElement("a");
  logoContainer.href = "./index.html";
  logoContainer.setAttribute("aria-label", "View home page");
  logoContainer.style.width = "auto";
  logoContainer.style.height = "auto";
  logoContainer.classList.add(
    "logo",
  );
  const logoImage = document.createElement("img");
  logoImage.src = "/assets/logo/vinterst-logotype.svg";
  logoImage.alt = "Vinterest Logo";
  logoImage.loading = "lazy";
  logoImage.style.width = "150px";
  logoImage.style.height = "auto";
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

  const createLink = document.createElement("a");
  createLink.setAttribute("aria-label", "Create a Post");
  createLink.href = "/post/create.html";
  createLink.classList.add(
    "nav-link",
  );
  createLink.textContent = "Create";

  const logoutContainer = document.createElement("div");
  setLogoutListener(logoutContainer);


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
  mobileExplore.classList.add(
  );
  const mobileExploreLink = document.createElement("a");
  mobileExploreLink.setAttribute("aria-label", "View blog posts made by our community!");
  mobileExploreLink.href = "/post/index.html";
  mobileExploreLink.textContent = "Explore";
  mobileExploreLink.classList.add(
    "mobile-nav-link",
  );

  const mobileCreate = document.createElement("li");
  mobileCreate.classList.add(
  );
  const mobileCreateLink = document.createElement("a");
  mobileCreateLink.setAttribute("aria-label", "Create a Post");
  mobileCreateLink.href = "/post/create.html";
  mobileCreateLink.textContent = "Create";
  mobileCreateLink.classList.add(
    "mobile-nav-link",
  );

  const mobileLogout = document.createElement("div");
  setLogoutListener(mobileLogout);

  pcNav.append(exploreLink, createLink, logoutContainer);

  mobileExplore.appendChild(mobileExploreLink);
  mobileCreate.appendChild(mobileCreateLink);
  menuBox.append(mobileExplore, mobileCreate, mobileLogout);
  mobileNav.append(menuButton, menuBox);
  headerContainer.append(logoContainer, pcNav, mobileNav);

  return headerContainer;
}