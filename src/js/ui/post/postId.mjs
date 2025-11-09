import { load } from "../../utilities/storage.mjs";
import { shareButton } from "../buttons/shareButton.mjs";
import { updateButton } from "../buttons/updateButton.mjs";


export function postIdTemplate(post) {
    const user = load("user");
    const usernameStorage = user?.name;
    const postId = `${post.id}`;

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("postId-container", "animate-resize");

    mainContainer.dataset.id = `${post.id}`;

    const content = document.createElement("div");
    content.classList.add("flex-XS-col");

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
    pic.loading = "lazy";
    pic.alt = `${post.media.alt || "Image relating to post"}`;
    pic.setAttribute("aria-label", `${post.media.alt}`);
    const overlay = document.createElement("div");
    overlay.classList.add(
        "post-img-overlay",
        "animate-resize"
    );

    const picMiniContainer = document.createElement("div");
    picMiniContainer.classList.add("pic-mini-container");
    
    const picMini = document.createElement("img");
    picMini.classList.add("img", "pic-mini");
    const placeholderImageMini =
        "https://cdn.pixabay.com/photo/2020/08/31/16/39/ephemera-5532941_1280.jpg";
        if (!post.media?.url || post.media.url.includes("example.com")) {
            picMini.src = placeholderImageMini;
        } else {
            picMini.src = post.media.url;
        }
    picMini.alt = `Minature image: ${post.media.alt || "Minature image of main image"}`;
    picMini.setAttribute("aria-label", `Miniature picture: ${post.media.alt}`);
    
    picMiniContainer.appendChild(picMini);

    const shareContainer = document.createElement("div");
    shareContainer.classList.add("share-button-position");
    shareContainer.appendChild(shareButton());


    pictureFrame.appendChild(pic);
    pictureFrame.appendChild(overlay);

    const mainContent = document.createElement("div");
    mainContent.classList.add(
        "main-content",
        "animate-resize"
    );

    const titleContent = document.createElement("div");
    titleContent.classList.add(
        "title-content",
        "animate-resize"
    );
    const title = document.createElement("p");
    title.classList.add("display-1");
    title.textContent = `${post.title}`;

    titleContent.append(shareContainer, title);

    const description = document.createElement("p");
    description.classList.add("body-text", "py-4", "mb-6");
    description.textContent = `${post.body}`;

    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add(
        "content-wrapper",
        "animate-resize"
    );
    
    const userDetailsContainer = document.createElement("div");
    userDetailsContainer.classList.add(
        "user-container",
        "animate-resize"
    );

    const userTitle = document.createElement("h2");
    userTitle.classList.add("subtitle-2", "all-caps");
    userTitle.textContent = "Author"

    const userDetailsContent = document.createElement("div");
    userDetailsContent.classList.add(
        "user-content",
        "animate-resize"
    );

    const author = `${post.author.name}`;
    const username = document.createElement("p");
    username.classList.add(
        "heading-3", "capitalized", "line-under"
    );
    username.textContent = author;

    const userEmail = document.createElement("p");
    userEmail.classList.add("caption", "italic", "txt-color-grey", "line-under");
    userEmail.textContent = `${post.author.email}`;

    const userBio = document.createElement("p");
    userBio.classList.add("caption", "line-under");
    userBio.textContent = post.author.bio?.trim()
        ? post.author.bio
        : "Hi, I'm a vintage blogger!";

    const userIconNameContainer = document.createElement("div");
    userIconNameContainer.className = "flex-S-row";
    const userContentContainer = document.createElement("div");
    userContentContainer.className = "flex-XS-col";

    userContentContainer.append(username, userEmail, userBio);

    userIconNameContainer.append(userContentContainer);

    const updateContainer = document.createElement("div");
    if (usernameStorage === author ) {
    updateContainer.append(updateButton(postId));
    }
    content.append(titleContent, contentWrapper)

    contentWrapper.append(mainContent, userDetailsContainer);

    userDetailsContent.append(userIconNameContainer);
    userDetailsContainer.append( userTitle, userDetailsContent, picMiniContainer);

    mainContent.append(description, updateContainer);
    mainContainer.append(pictureFrame, content);

    return mainContainer;
}