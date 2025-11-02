import { formatDate } from "../../utilities/formatDate.mjs";

export function singlePost(post) {
    const mainContainer = document.createElement("a");
    mainContainer.classList.add(
        "post-container"
    );
    mainContainer.dataset.id = `${post.id}`;
    mainContainer.href = `/post/?id=${post.id}`;
    mainContainer.setAttribute("aria-label", `View post titled "${post.title}"`);
    mainContainer.setAttribute("title", `View post titled "${post.title}"`);

    const pictureFrame = document.createElement("div");
    pictureFrame.classList.add(
        "post-img-container"
    );
    const pic = document.createElement("img");
    pic.classList.add("img");
    const placeholderImage = "https://unsplash.com/photos/grayscale-photo-of-man-and-dog-VvSY-fOx6pw";
    if (!post.media?.url) {
        pic.src = placeholderImage;
    } else {
        pic.src = post.media.url;
    }
    pic.classList.add("img");
    pic.alt = `${post.media.alt || "Image related to blog post"}`;
    pic.setAttribute("aria-label", `${post.media.alt}`);
    const overlay = document.createElement("div");
    overlay.classList.add(
        "post-img-overlay"
    );
    pictureFrame.appendChild(pic);
    pictureFrame.appendChild(overlay);

    const mainContent = document.createElement("div");
    mainContent.classList.add(
        "main-content"
    );

    const titleContent = document.createElement("div");
    titleContent.classList.add(
        "title-content", "centered",
    );

    const author = document.createElement("p");
    author.classList.add("caption", "italic", "right");
    author.textContent = `Written by: ${post.author.name}`;

    const title = document.createElement("p");
    title.classList.add("subtitle-1", "all-caps");
    title.textContent = `${post.title}`;

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = `${post.body}`;

    titleContent.append(title, description);

    const postTags = document.createElement("div");
    postTags.classList.add(
        "post-tags"
    );

    const created = document.createElement("p");
    created.classList.add("caption", "centered");
    created.innerText = formatDate(post.created);


    const tags = document.createElement("p");
    tags.className = "caption";
    tags.innerText = `${post.tags.map(tag => `#${tag}`).join(", ")}`;
    postTags.appendChild(author, tags);


    mainContent.append(created,titleContent, postTags);
    mainContainer.append(pictureFrame, mainContent);

    return mainContainer;
}