document.addEventListener("DOMContentLoaded", () => {
	function fetchPosts() {
		const apiUrl = "https://v2.api.noroff.dev/blog/posts/aggi_1";
		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				populateGrid(data.data);
			})
			.catch((error) => console.error("Error fetching posts:", error));
	}

	fetchPosts();

	function populateGrid(posts) {
		const gridContainer = document.querySelector(".post-grid-wrapper");

		const postTemplate = document.querySelector(".post-container.S");

		gridContainer.innerHTML = "";

		posts.forEach((post) => {
			const postElement = postTemplate.cloneNode(true);
			postElement.addEventListener("click", function (e) {
				window.location.href = `/post/single.html?${post.author.name}&${post.id}`;
			});
			postElement.querySelector(".postImg").src = post.media.url;
			postElement.querySelector(".postImg").alt =
				post.media.alt || "Post image";
			postElement.querySelector(".heading-1").textContent = post.title;
			postElement.querySelector(".caption").textContent = new Date(
				post.updated,
			).toLocaleDateString();
			const avatarContainer = postElement.querySelector(".img-circle");
			const avatarImg = document.createElement("img");
			avatarImg.src = post.author.avatar.url;
			avatarImg.alt = post.author.avatar.alt || "Author avatar";
			avatarContainer.appendChild(avatarImg);
			postElement.querySelector(".body.bold").textContent = post.author.name;

			gridContainer.appendChild(postElement);
		});
	}
});
