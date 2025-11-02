import { load } from "../../utilities/storage.mjs";
import { shareButton } from "../buttons/shareButton.mjs";
import { updateButton } from "../buttons/updateButton.mjs";


export function postIdTemplate(post) {
    const user = load("user");
    const usernameStorage = user.name;
    const postId = `${post.id}`;

    const mainContainer = document.createElement("div");
    mainContainer.className = "postId-container";

    mainContainer.dataset.id = `${post.id}`;

    const pictureFrame = document.createElement("div");
    pictureFrame.classList.add(
        "postId-img-container"
    );

    const pic = document.createElement("img");
    const placeholderImage =
        "https://unsplash.com/photos/grayscale-photo-of-man-and-dog-VvSY-fOx6pw";
    if (!post.media?.url || post.media.url.includes("example.com")) {
        pic.src = placeholderImage;
    } else {
        pic.src = post.media.url;
    }
    pic.classList.add(
        "img"
    );
    pic.alt = `${post.media.alt || "Image relating to post"}`;
    pic.setAttribute("aria-label", `${post.media.alt}`);
    const overlay = document.createElement("div");
    overlay.classList.add(
        "post-img-overlay"
    );

    const shareContainer = document.createElement("div");
    shareContainer.classList.add("share-button-position");
    shareContainer.appendChild(shareButton());
    pictureFrame.appendChild(pic);
    pictureFrame.appendChild(shareContainer);
    pictureFrame.appendChild(overlay);

    const mainContent = document.createElement("div");
    mainContent.classList.add(
        "main-content",
    );

    const titleContent = document.createElement("div");
    titleContent.classList.add(
        "title-content"
    );
    const title = document.createElement("p");
    title.className = "display-1";
    title.textContent = `${post.title}`;

    titleContent.append(title);

    const description = document.createElement("p");
    description.classList.add("body-text", "py-4", "mb-6");
    description.textContent = `${post.body}`;
    
    const userDetailsContainer = document.createElement("div");
    userDetailsContainer.classList.add(
        "user-container"
    );
    const userDetailsContent = document.createElement("div");
    userDetailsContent.classList.add(
        "user-content"
    );

    const author = `${post.author.name}`;
    const username = document.createElement("p");
    username.classList.add(
        "heading-3"
    );

    username.textContent = author;
    const userEmail = document.createElement("p");
    userEmail.classList.add("caption", "italic", "txt-color-grey");
    userEmail.textContent = `${post.author.email}`;
    const userBio = document.createElement("p");
    userBio.classList.add("caption");
    userBio.textContent = post.author.bio?.trim()
        ? post.author.bio
        : "Hi, I'm a vintage blogger!";

    const userIconNameContainer = document.createElement("div");
    userIconNameContainer.className = "flex-S-row";
    const userContentContainer = document.createElement("div");
    userContentContainer.className = "flex-XS-col";

    userContentContainer.append(username, userEmail, userBio);

    
    const userIconContainer = document.createElement("div");
    userIconContainer.classList.add(
        "img-circle-L"
    );

    userIconNameContainer.append(userIconContainer, userContentContainer);

    const userAvatar = document.createElement("img");
    userAvatar.classList.add(
        "img"
    );
    userAvatar.src = `${post.author.avatar.url}`;
    userAvatar.alt = `${post.author.avatar.alt || "User avatar"}`;
    userAvatar.setAttribute("aria-label", `${post.author.avatar.alt}`);

    const updateContainer = document.createElement("div");
    if (usernameStorage === author ) {
    updateContainer.append(updateButton(postId));
    }

    userIconContainer.appendChild(userAvatar);
    userDetailsContent.append(userIconNameContainer);
    userDetailsContainer.append(userDetailsContent);

    mainContent.append(titleContent, description, userDetailsContainer, updateContainer);
    mainContainer.append(pictureFrame, mainContent);

    return mainContainer;
}