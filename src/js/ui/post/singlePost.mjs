export function singlePost(post) {
    const mainContainer = document.createElement("div");
    mainContainer.classList.add(
        "post-container"
    );
    mainContainer.dataset.id = `${post.id}`;

    const pictureFrame = document.createElement("div");
    pictureFrame.classList.add(
        "post-img-container"
    );
    const pic = document.createElement("img");
    pic.classList.add("img");
    const placeholderImage =
        "https://unsplash.com/photos/grayscale-photo-of-man-and-dog-VvSY-fOx6pw";
    if (!post.image?.url || post.image.url.includes("example.com")) {
        pic.src = placeholderImage;
    } else {
        pic.src = post.image.url;
    }
    pic.classList.add("img");
    pic.alt = `${post.image.alt || "Image related to blog post"}`;
    pic.setAttribute("aria-label", `${post.image.alt}`);
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
        "title-content"
    );
    const author = document.createElement("p");
    author.classList.add("caption");
    author.textContent = `${post.author}`;

    const title = document.createElement("p");
    title.classList.add("heading-3");
    title.textContent = `${post.title}`;

    const description = document.createElement("p");
    description.classList.add(
        "description"
    );
    description.textContent = `${post.body}`;

    titleContent.append(title, description);

    const postTags = document.createElement("div");
    postTags.classList.add(
        "post-tags"
    );

    const tags = document.createElement("p");
    tags.className.add("caption")
    tags.innerText = `${post.tags.map(tag => `#${tag}`).join(", ")}`;
    postTagsContainer.appendChild(tags);


    mainContent.append(titleContent, postTags);
    mainContainer.append(pictureFrame, mainContent);

    return mainContainer;
}