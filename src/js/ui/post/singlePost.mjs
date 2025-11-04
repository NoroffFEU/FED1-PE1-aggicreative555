import { formatDate } from "../../utilities/formatDate.mjs";

export function singlePost(post) {
    const mainContainer = document.createElement("a");
    mainContainer.classList.add(
        "post-container",
        "animate-resize"
    );
    mainContainer.dataset.id = `${post.id}`;
    mainContainer.href = `/post/?id=${post.id}`;
    mainContainer.setAttribute("aria-label", `View post titled "${post.title}"`);
    mainContainer.setAttribute("title", `View post titled "${post.title}"`);

    const pictureFrame = document.createElement("div");
    pictureFrame.classList.add(
        "post-img-container",
        "animate-resize"
    );
    const pic = document.createElement("img");
    pic.classList.add("img");
    const placeholderImage = "https://cdn.pixabay.com/photo/2020/08/31/16/39/ephemera-5532941_1280.jpg";
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
        "post-img-overlay",
        "animate-resize"
    );
    pictureFrame.appendChild(pic);
    pictureFrame.appendChild(overlay);

    const mainContent = document.createElement("div");
    mainContent.classList.add(
        "main-content",
        "animate-resize"
    );

    const titleContent = document.createElement("div");
    titleContent.classList.add(
        "title-", "centered",
    );

    const date = document.createElement("p");
    date.classList.add("caption", "italic");
    date.textContent = formatDate(post.created);


    const author = document.createElement("p");
    author.classList.add("author", "italic", "line-under", "capitalized");
    author.textContent = `Written By ${post.author.name}`;

    const title = document.createElement("p");
    title.classList.add("display-1", "single-post");
    title.textContent = `${post.title}`;

    const description = document.createElement("p");
    description.classList.add("description", "single-post");
    description.textContent = `${post.body}`;

    const postTags = document.createElement("div");
    postTags.classList.add(
        "post-tags"
    );

    const tags = document.createElement("p");
    tags.className = "caption";
    tags.innerText = `${post.tags.map(tag => `#${tag}`).join(", ")}`;
    postTags.appendChild(tags);

    titleContent.append(date, title, author, description, postTags);
    mainContent.append(titleContent);
    mainContainer.append(pictureFrame, mainContent);

    return mainContainer;
}