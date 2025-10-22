/**
 * Creates a "Update post" button and appends it to the page.
 *
 * When clicked, the button navigates the user to the edit page of the specific post, based on post id.
 *
 * @function updateButton
 * @param {string|number} postId - The ID of the post to update.
 */
export function updateButton(postId) {
  if (!postId) {
    console.warn("Post id is required.");
    return;
  }
  const updateButton = document.createElement("button");
  updateButton.classList.add(
    "btn-primary"
  );
  updateButton.textContent = "Edit Post";

  updateButton.addEventListener("click", (event) => {
    event.stopPropagation();
    window.location.href = `/post/edit/?id=${postId}`;
  });

  return updateButton;
}