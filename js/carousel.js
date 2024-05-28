
class HDCarousel {
    constructor(el) {
        this.el = el;
        this.items = Array.from(this.el.getElementsByClassName('post-container'));
        this.size = 3;
        this.totalItems = this.items.length;
        this.currentIndex = 0;

        this.showItems();
        this.setupEventListeners();
        this.setupDotNavigation();
        this.updateDots();
    }

    showItems() {
        console.log('Showing items from index', this.currentIndex);
        const offset = -this.currentIndex * 100 / this.size;
        this.items.forEach((item, index) => {
            item.style.transform = `translateX(${offset}%)`;
        });
    }

    move(direction) {
        console.log('Move function called with direction:', direction);
        if (direction === 'next') {
            this.currentIndex = (this.currentIndex + this.size) % this.totalItems;
        } else if (direction === 'prev') {
            this.currentIndex = (this.currentIndex - this.size + this.totalItems) % this.totalItems;
        }
        console.log('New current index:', this.currentIndex);
        this.showItems();
        this.updateDots();
    }

    setupEventListeners() {
        const arrowLeft = document.getElementById('arrow-left');
        const arrowRight = document.getElementById('arrow-right');

        console.log('Arrow left element:', arrowLeft);
        console.log('Arrow right element:', arrowRight);

        if (arrowLeft && arrowRight) {
            arrowLeft.addEventListener('click', () => {
                console.log('Arrow left clicked');
                this.move('prev');
            });
            arrowRight.addEventListener('click', () => {
                console.log('Arrow right clicked');
                this.move('next');
            });
        } else {
            console.log('Arrow elements not found');
        }
    }

    setupDotNavigation() {
        console.log('Setting up dot navigation');
        const dots = document.querySelectorAll('.dot-nav .dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                console.log('Dot clicked, index:', index);
                this.currentIndex = index * this.size;
                this.showItems();
                this.updateDots();
            });
        });
    }

    updateDots() {
        console.log('Updating dots');
        const dots = document.querySelectorAll('.dot-nav .dot');
        dots.forEach(dot => dot.classList.remove('active'));
        const activeDot = Math.floor(this.currentIndex / this.size);
        console.log('Active dot index:', activeDot);
        if (dots[activeDot]) {
            dots[activeDot].classList.add('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    const el = document.querySelector('.slider-container');
    if (el) {
        new HDCarousel(el);
    } else {
        console.log('Carousel items element not found');
    }
});

document.addEventListener("DOMContentLoaded", () => {
	const profile = JSON.parse(localStorage.getItem("profile"));
	console.log(profile);
	function fetchPosts() {
		const apiUrl = `https://v2.api.noroff.dev/blog/posts/${profile.name}`;
		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				populateCarousel(data.data);
			})
			.catch((error) => console.error("Error fetching posts:", error));
	}
	fetchPosts();
	function populateCarousel(posts) {
		const carouselContainer = document.getElementById("carousel_items");

		const postTemplate = carouselContainer.querySelector(".hdcarousel_item");

		carouselContainer.innerHTML = "";

		posts.forEach((post) => {
			const postElement = postTemplate.cloneNode(true);
			postElement.addEventListener("click", function (e) {
				window.location.href = `/post/single.html?${post.author.name}&${post.id}`;
			});
			postElement.querySelector(".postImg").src = post.media.url;
			postElement.querySelector(".postImg").alt =
				post.media.alt || "Post image";
			postElement.querySelector(".postTitle").textContent = post.title;
			postElement.querySelector(".updateDate").textContent = new Date(
				post.updated,
			).toLocaleDateString();
			postElement.querySelector(".avatarImg").src = post.author.avatar.url;
			postElement.querySelector(".avatarImg").alt =
				post.author.avatar.alt || "Author avatar";
			postElement.querySelector("#authorName").textContent = post.author.name;

			carouselContainer.appendChild(postElement);
		});

		new HDCarousel(carouselContainer);
	}
});

class HDCarousel {
	constructor(el) {
		this.el = el;
		this.items = Array.from(this.el.getElementsByClassName("post-container"));
		this.size = 3;
		this.totalItems = this.items.length;
		this.currentIndex = 0;

		this.showItems();
		this.setupEventListeners();
		this.setupDotNavigation();
		this.updateDots();
	}

	showItems() {
		const offset = (-this.currentIndex * 100) / this.size;
		this.items.forEach((item, index) => {
			item.style.transform = `translateX(${offset}%)`;
		});
	}

	move(direction) {
		if (direction === "next") {
			this.currentIndex = (this.currentIndex + this.size) % this.totalItems;
		} else if (direction === "prev") {
			this.currentIndex =
				(this.currentIndex - this.size + this.totalItems) % this.totalItems;
		}
		this.showItems();
		this.updateDots();
	}

	setupEventListeners() {
		const arrowLeft = document.getElementById("arrow-left");
		const arrowRight = document.getElementById("arrow-right");

		if (arrowLeft && arrowRight) {
			arrowLeft.addEventListener("click", () => {
				this.move("prev");
			});
			arrowRight.addEventListener("click", () => {
				this.move("next");
			});
		} else {
			console.log("Arrow elements not found");
		}
	}

	setupDotNavigation() {
		const dots = document.querySelectorAll(".dot-nav .dot");
		dots.forEach((dot, index) => {
			dot.addEventListener("click", () => {
				this.currentIndex = index * this.size;
				this.showItems();
				this.updateDots();
			});
		});
	}

	updateDots() {
		const dots = document.querySelectorAll(".dot-nav .dot");
		dots.forEach((dot) => dot.classList.remove("active"));
		const activeDot = Math.floor(this.currentIndex / this.size);

		if (dots[activeDot]) {
			dots[activeDot].classList.add("active");
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const el = document.querySelector(".slider-container");
	if (el) {
		new HDCarousel(el);
	} else {
		console.log("Carousel items element not found");
	}
});


