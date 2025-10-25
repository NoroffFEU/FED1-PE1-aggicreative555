import { onDeletePost } from "../post/delete.mjs";

/**
 * Creates and appends a "Delete Post" button to the page.
 * Binds a click handler to trigger the deletion of the current post.
 *
 * @function deleteButton
 * @fires onDeletePost - Called when the button is clicked.
 * @modifies DOM - Appends a button to document.body.
 */


export function deleteButton() {
  const deleteButton = document.createElement("button");

  deleteButton.innerHTML = "Delete post";
  deleteButton.className = "btn-secondary";

  deleteButton.addEventListener("click", (e) => onDeletePost(e));

  document.body.appendChild(deleteButton);

  return deleteButton;
}