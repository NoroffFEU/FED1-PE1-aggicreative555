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
    const link = document.createElement("a");
    link.classList.add("btn-primary");
    link.href = `/post/edit.html?id=${encodeURIComponent(postId)}`;
    link.textContent = "Edit Post";
    link.setAttribute("aria-label", `Edit post ${postId}`);

  return link;
}