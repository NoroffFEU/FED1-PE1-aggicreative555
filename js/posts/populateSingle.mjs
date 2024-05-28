import { getPost } from "./getSingle.mjs";
import { load } from "../storage.mjs";
import { removePost } from "./delete.mjs";
import { updatePost } from "./update.mjs";

const profile = JSON.parse(load("profile"));
const postImg = document.querySelector(".postImg");
function formatDate(dateString) {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
	const year = date.getFullYear();
	return `${day}.${month}.${year}`;
}

function createEditButton() {
	const editButton = document.createElement("button");
	editButton.textContent = "Edit";
	editButton.classList.add("editButton");
	return editButton;
}

function createDeleteButton() {
	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	deleteButton.classList.add("deleteButton");
	return deleteButton;
}

function createSaveButton() {
	const saveButton = document.createElement("button");
	saveButton.textContent = "Save";
	saveButton.classList.add("saveButton");
	return saveButton;
}

function handleEditButtonClick(editButton, saveButton) {
	const postTitle = document.querySelector(".postTitle");
	const postBody = document.querySelector(".postBody");

	const titleInput = document.createElement("input");
	titleInput.setAttribute("type", "text");
	titleInput.classList.add("editTitle");
	titleInput.value = postTitle.textContent;

	const bodyInput = document.createElement("textarea");
	bodyInput.classList.add("editBody");
	bodyInput.textContent = postBody.textContent;

	const imgInput = document.createElement("input");
	imgInput.setAttribute("type", "text");
	imgInput.classList.add("editImg");
	imgInput.value = postImg.src;
	imgInput.classList.add("imgInput");
	postTitle.replaceWith(titleInput);
	postBody.replaceWith(bodyInput);

	const imageContainer = document.querySelector(".image-container");
	imageContainer.appendChild(imgInput);

	editButton.replaceWith(saveButton);

	saveButton.addEventListener("click", () =>
		handleSaveButtonClick(
			saveButton,
			editButton,
			titleInput,
			bodyInput,
			imgInput,
		),
	);
}

function handleSaveButtonClick(
	saveButton,
	editButton,
	titleInput,
	bodyInput,
	imgInput,
) {
	const postData = {
		title: titleInput.value,
		body: bodyInput.value,
		media: {
			url: imgInput.value,
		},
	};

	console.log(postData);
	updatePost(postData);

	const newTitleElement = document.createElement("h1");
	newTitleElement.classList.add("postTitle");
	newTitleElement.textContent = titleInput.value;

	const newBodyElement = document.createElement("article");
	newBodyElement.classList.add("postBody");
	newBodyElement.textContent = bodyInput.value;
	console.log(postImg.src);
	postImg.src = imgInput.value;

	titleInput.replaceWith(newTitleElement);
	bodyInput.replaceWith(newBodyElement);
	imgInput.remove();
	saveButton.replaceWith(editButton);
}

function handleDeleteButtonClick() {
	removePost();
}

function addEditAndDeleteButtons() {
	const buttonsContainer = document.createElement("div");
	buttonsContainer.classList.add("buttonsContainer");

	const editButton = createEditButton();
	const deleteButton = createDeleteButton();
	const saveButton = createSaveButton();

	editButton.addEventListener("click", () =>
		handleEditButtonClick(editButton, saveButton),
	);
	deleteButton.addEventListener("click", handleDeleteButtonClick);

	buttonsContainer.appendChild(editButton);
	buttonsContainer.appendChild(deleteButton);

	const imageContainer = document.querySelector(".image-container");
	imageContainer.appendChild(buttonsContainer);
}

async function populatePost() {
	try {
		const postData = await getPost();

		console.log(postData.data);
		const author = document.querySelector(".authorInfo");
		author.querySelector(".authorAvatar").src = postData.data.author.avatar.url;
		author.querySelector(".authorName").textContent = postData.data.author.name;

		postImg.src = postData.data.media.url;
		postImg.alt = postData.data.media.alt;

		const postTitle = document.querySelector(".postTitle");
		postTitle.textContent = postData.data.title;

		const postBody = document.querySelector(".postBody");
		postBody.textContent = postData.data.body;

		const postDate = document.querySelector(".postDate");
		postDate.textContent = formatDate(postData.data.created);

		if (profile.name === postData.data.author.name) {
			addEditAndDeleteButtons();
		}
	} catch (error) {
		console.error("Error fetching post:", error);
	}
}

populatePost();
