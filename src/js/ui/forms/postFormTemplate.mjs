
export function postFormTemplate({ isEdit = false, postData = {} } = {}) {
    const form = document.createElement("form");
    form.id = isEdit ? "editPost" : "createPost";
    form.setAttribute("aria-labelledby", "formTitle");

    const formTitle = document.createElement("h1");
    formTitle.id = "formTitle";
    formTitle.className = "title";
    formTitle.textContent = isEdit ? "Edit Post" : "Create Post";
    form.appendChild(formTitle);

    const essentials = document.createElement("fieldset");
    essentials.className = "fieldset" ;
    const essentialsLegend = document.createElement("legend");
    essentialsLegend.textContent = "Post Details";
    essentials.appendChild(essentialsLegend);

    const titleLabel = document.createElement("label");
    titleLabel.htmlFor = "title";
    titleLabel.textContent = "Title";
    titleLabel.className = "label-base";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "title";
    titleInput.name = "title";
    titleInput.className = "input-base";
    titleInput.required = true;
    titleInput.placeholder = "Enter your post title";
    titleInput.maxLength = 100;
    titleInput.value = isEdit ? postData.title || "" : "";
    essentials.append(titleLabel, titleInput);

    
    const bodyLabel = document.createElement("label");
    bodyLabel.htmlFor = "body";
    bodyLabel.textContent = "Body";
    bodyLabel.className = "label-base";
    const bodyTextarea = document.createElement("textarea");
    bodyTextarea.id = "body";
    bodyTextarea.name = "body";
    bodyTextarea.className = "input-base";
    bodyTextarea.placeholder = "Write your post content here...";
    bodyTextarea.rows = 6;
    bodyTextarea.value = isEdit ? postData.body || "" : "";
    essentials.append(bodyLabel, bodyTextarea);


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
    essentials.append(tagsLabel, tagsInput);

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
    essentials.append(mediaUrlLabel, mediaUrlInput);

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
    essentials.append(mediaAltLabel, mediaAltInput);

    form.appendChild(essentials);

    
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "btn-primary";
    submitBtn.textContent = isEdit ? "Update Post" : "Create Post";
    submitBtn.setAttribute("aria-label", submitBtn.textContent);
    form.appendChild(submitBtn);

    return form;
}