import { load } from "../../utilities/storage.mjs";
import { footerNav } from "../footer/footerNav.mjs";
import { adminNav } from "./adminNav.mjs";
import { userNav } from "./userNav.mjs";

export function navToggler() {
  const isLoggedIn = load("accessToken");
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  const footerTemplate = footerNav();

  footer.append(footerTemplate);

  if (isLoggedIn) {
    const loggedinNav = adminNav();
    header.prepend(loggedinNav);
  } else {
    const notLoggedNav = userNav();
    header.prepend(notLoggedNav);
  }
}