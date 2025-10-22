/**
 * Creates a "Share pet" button and appends it to the page.
 *
 * When clicked, the button copies the current page's URL (excluding the 'http://')
 * to the user's clipboard and displays a confirmation alert.
 *
 * @function shareButton
 */
export function shareButton() {
  const shareButton = document.createElement("button");
  shareButton.classList.add(
    "btn-XS"
  );
  const shareIcon = document.createElement("i");
  shareIcon.classList.add("material-symbols-sharp",);
  shareButton.textContent = "share"
  shareButton.title = "Share post";
  shareButton.ariaLabel = "Share post";
  shareButton.appendChild(shareIcon);

  // Storing the URL of the current webpage
  const url = window.location.href.slice(7); // Removes 'http://'

  shareButton.addEventListener("click", () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  });

  return shareButton;
}