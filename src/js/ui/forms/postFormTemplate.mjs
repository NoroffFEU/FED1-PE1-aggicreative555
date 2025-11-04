import { deleteButton } from "../buttons/deleteButton.mjs";

export function postFormTemplate({ isEdit = false, postData = {} } = {}) {
    const form = document.createElement("form");
    form.classList.add("form");
    form.id = isEdit ? "editPost" : "createPost";
    form.setAttribute("aria-labelledby", "formTitle");

    const formTitle = document.createElement("h1");
    formTitle.id = "formTitle";
    formTitle.classList.add("display-XL", "centered", "underline")
    formTitle.textContent = isEdit ? "Edit Post" : "Create Post";
    form.appendChild(formTitle);

    const formContainer = document.createElement("div");
    formContainer.classList.add("postId-container");

    const content = document.createElement("div");
    content.classList.add("flex-XS-col");

    // Image

    const pictureContainer = document.createElement("div");
    pictureContainer.classList.add("flex-XS-col");
    const pictureFrame = document.createElement("div");
    pictureFrame.classList.add(
        "postId-img-container"
    );

    const imgPreview = document.createElement("img");
    imgPreview.className = "img";
    imgPreview.alt = "Post image preview";
    imgPreview.src = 
    postData.media?.url || "https://cdn.pixabay.com/photo/2020/08/31/16/39/ephemera-5532941_1280.jpg";

    pictureFrame.append(imgPreview);

    const mediaInputContainer = document.createElement("div");
    mediaInputContainer.classList.add("flex-S-col");

    const mediaUrlContainer = document.createElement("div");
    mediaUrlContainer.classList.add("form-item");

    const mediaUrlLabel = document.createElement("label");
    mediaUrlLabel.htmlFor = "media-url";
    mediaUrlLabel.textContent = "Image URL";
    mediaUrlLabel.className = "label-base";
    const mediaUrlInput = document.createElement("input");
    mediaUrlInput.type = "url";
    mediaUrlInput.id = "media-url";
    mediaUrlInput.name = "media.url";
    mediaUrlInput.className = "input-base";
    mediaUrlInput.placeholder = "https://example.com/image.jpg";
    mediaUrlInput.pattern = "^https?:\\/\\/.+$";
    mediaUrlInput.value = isEdit && postData.media ? postData.media.url || "" : "";

    mediaUrlContainer.append(mediaUrlLabel, mediaUrlInput);

    const mediaAltContainer = document.createElement("div");
    mediaAltContainer.classList.add("form-item");
    const mediaAltLabel = document.createElement("label");
    mediaAltLabel.htmlFor = "media-alt";
    mediaAltLabel.textContent = "Image Alt Text";
    mediaAltLabel.className = "label-base";
    const mediaAltInput = document.createElement("input");
    mediaAltInput.type = "text";
    mediaAltInput.id = "media-alt";
    mediaAltInput.name = "media.alt";
    mediaAltInput.className = "input-base";
    mediaAltInput.placeholder = "Describe the image for accessibility";
    mediaAltInput.maxLength = 100;
    mediaAltInput.value = isEdit && postData.media ? postData.media.alt || "" : "";

    mediaAltContainer.append(mediaAltLabel, mediaAltInput);

    mediaInputContainer.append(mediaUrlContainer, mediaAltContainer);

    pictureContainer.append(pictureFrame, mediaInputContainer);

    // Main content
    
    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add(
        "content-wrapper",
        "animate-resize"
    );

    const mainContent = document.createElement("div");
    mainContent.classList.add(
        "main-content",
        "animate-resize"
    );

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("form-item")
    const titleLabel = document.createElement("label");
    titleLabel.htmlFor = "title";
    titleLabel.textContent = "Title";
    titleLabel.className = "label-base";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "title";
    titleInput.name = "title";
    titleInput.className = "input-base display-1";
    titleInput.required = true;
    titleInput.placeholder = "Article title";
    titleInput.maxLength = 100;
    titleInput.value = isEdit ? postData.title || "Article Title" : "";
    titleContainer.append(titleLabel, titleInput);

    const bodyContainer = document.createElement("div");
    bodyContainer.classList.add("form-item")
    const bodyLabel = document.createElement("label");
    bodyLabel.htmlFor = "body";
    bodyLabel.textContent = "Body";
    bodyLabel.className = "label-base";
    const bodyTextarea = document.createElement("textarea");
    bodyTextarea.id = "body";
    bodyTextarea.name = "body";
    bodyTextarea.className = "input-base";
    bodyTextarea.placeholder = "My article is about...";
    bodyTextarea.value = isEdit ? postData.body || "" : "";
    bodyContainer.append(bodyLabel, bodyTextarea);

    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add("form-item")
    const tagsLabel = document.createElement("label");
    tagsLabel.htmlFor = "tags";
    tagsLabel.className = "label-base";
    tagsLabel.textContent = "Tags";
    const tagsInput = document.createElement("input");
    tagsInput.type = "text";
    tagsInput.className = "input-base";
    tagsInput.id = "tags";
    tagsInput.name = "tags";
    tagsInput.placeholder = "lifestyle, food, hobby";
    tagsInput.value = isEdit && postData.tags ? postData.tags.join(", ") : "";
    tagsContainer.append(tagsLabel, tagsInput);

    // Buttons 

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "btn-primary";
    submitBtn.textContent = isEdit ? "Update Post" : "Create Post";
    submitBtn.setAttribute("aria-label", submitBtn.textContent);
    mainContent.append(bodyContainer, tagsContainer, submitBtn);
    
    if (isEdit) {
    const deleteBtn = deleteButton();
    mainContent.appendChild(deleteBtn);
    }

    // Author section

    const picMiniContainer = document.createElement("div");
    picMiniContainer.classList.add("pic-mini-container");
    
    const miniImgPreview = document.createElement("img");
    miniImgPreview.classList.add("img","pic-mini");
    miniImgPreview.alt = "Post image preview";
    miniImgPreview.src = 
    postData.media?.url || "https://cdn.pixabay.com/photo/2020/08/31/16/39/ephemera-5532941_1280.jpg";

    picMiniContainer.appendChild(miniImgPreview);

    // Image preview on main image and mini
    mediaUrlInput.addEventListener("mouseleave", () => {
        const url = mediaUrlInput.value.trim();
        if (url.startsWith("http")) {
            imgPreview.src = url;
            miniImgPreview.src = url;
        }
    })

    const userDetailsContainer = document.createElement("div");
    userDetailsContainer.classList.add(
        "user-container",
        "animate-resize"
    );
    userDetailsContainer.style.opacity = "0.5";

    const userTitle = document.createElement("h2");
    userTitle.classList.add("subtitle-2", "all-caps");
    userTitle.textContent = "Author"

    const userDetailsContent = document.createElement("div");
    userDetailsContent.classList.add(
        "user-content",
        "animate-resize"
    );

    const author = `${postData.author.name}`;
    const username = document.createElement("p");
    username.classList.add(
        "heading-3", "capitalized", "line-under"
    );
    username.textContent = author;

    const userEmail = document.createElement("p");
    userEmail.classList.add("caption", "italic", "txt-color-grey", "line-under");
    userEmail.textContent = `${postData.author.email}`;

    const userBio = document.createElement("p");
    userBio.classList.add("caption", "line-under");
    userBio.textContent = postData.author.bio?.trim()
        ? postData.author.bio
        : "Hi, I'm a vintage blogger!";

    const userIconNameContainer = document.createElement("div");
    userIconNameContainer.className = "flex-S-row";
    const userContentContainer = document.createElement("div");
    userContentContainer.className = "flex-XS-col";

    userContentContainer.append(username, userEmail, userBio);

    userIconNameContainer.append(userContentContainer);

    userDetailsContent.append(userIconNameContainer);
    userDetailsContainer.append( userTitle, userDetailsContent, picMiniContainer);

    content.append(titleContainer, contentWrapper)

    contentWrapper.append(mainContent, userDetailsContainer);

    formContainer.append(pictureContainer, content);

    form.append(formContainer);

    return form;
}