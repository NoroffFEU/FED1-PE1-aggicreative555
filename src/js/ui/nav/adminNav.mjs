import { load } from "../../utilities/storage.mjs";

export function adminNav() {
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
  logoImage.src = "";
  logoImage.alt = "Vinterest Logo";
  logoContainer.appendChild(logoImage);

  const pcNav = document.createElement("nav");
  pcNav.classList.add(
    "desktop-wrapper"
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

  const userIconContainer = document.createElement("a");
  userIconContainer.href = "/profile/index.html";
  userIconContainer.classList.add(
    "logo-container",
  );
  userIconContainer.title = "Go to my profile";
  const rawUser = load("user");
  const user = typeof rawUser === "string" ? JSON.parse(rawUser) : rawUser;
  const {
    avatar: { url: avatarUrl = "", alt: avatarAlt = "User avatar" } = {},
  } = user;
  const userIconImage = document.createElement("img");
  userIconImage.src = avatarUrl;
  userIconImage.alt = avatarAlt || "User avatar";
  userIconImage.setAttribute("aria-label", "User's avatar");
  userIconImage.classList.add("logo-img");

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


  const mobileUserIconContainer = document.createElement("a");
  mobileUserIconContainer.href = "/profile/index.html";
  mobileUserIconContainer.classList.add(
    "logo-container"
  );
  mobileUserIconContainer.title = "Go to my profile";
  const mobileUserIconImage = document.createElement("img");
  mobileUserIconImage.src = avatarUrl;
  mobileUserIconImage.alt = avatarAlt || "User avatar";
  mobileUserIconImage.setAttribute("aria-label", "User's avatar");
  mobileUserIconImage.classList.add(
    "logo-img"
  );
  const username = load("userName");
  const usernameText = document.createElement("p");
  usernameText.innerHTML = `${username}`;

  mobileUserIconContainer.appendChild(mobileUserIconImage, usernameText);

  const mobileExplore = document.createElement("li");
  mobileExplore.classList.add(
  );
  const mobileExploreLink = document.createElement("a");
  mobileExploreLink.setAttribute("aria-label", "View blog posts made by our community!");
  mobileExploreLink.href = "/post/index.html";
  mobileExploreLink.textContent = "Explore Posts";
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

  pcNav.append(exploreLink, createLink, userIconContainer);
  userIconContainer.appendChild(userIconImage, username);
  mobileExplore.appendChild(mobileExploreLink);
  mobileCreate.appendChild(mobileCreateLink);
  menuBox.append(mobileUserIconContainer, mobileExplore, mobileCreate);
  mobileNav.append(menuButton, menuBox);
  headerContainer.append(logoContainer, pcNav, mobileNav);

  return headerContainer;
}