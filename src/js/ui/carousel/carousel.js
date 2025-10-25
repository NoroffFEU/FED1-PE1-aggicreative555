import { readPosts } from "../../api/posts/read.mjs";

const ANIMTION_DURATION = 460;

function createElement(tag, attributes = {}, children = {}) {
	const element = document.createElement(tag);
	for (const [k, v] of Object.entries(attributes || {})) {
		if (k === "className") element.className = v;
		else if (k === "text") element.textContent = String(v);
		else if (k === true) element.setAttribute(k, "");
		else if (v === false || v == null) continue;
		else element.setAttribute(k, String(v));

		const nodes = Array.isArray(children) ? children : [children];
		for (const child of nodes) {
			if (child == null) continue;
			if (typeof child === "string") element.appendChild(document.createTextNode(child));
		}
		return element;
	}

}

function buildSlide (post, roleClass = "") {
	const a = createElement("a", {
		href: `/post/?id=${encodeURIComponent(post.id)}`,
		className: `caorusel-item ${roleClass}`, 
		"aria-label": post.title ? `"Open post ${post.title}"` : "Open post",
	});

	const img = createElement("img", {
		alt: (post.media && post.media.alt) || post.title || "Post image",
	});

	img.loading = "lazy";
	img.src = post.media?.url || "";
	a.appendChild(img);
	return a;
}

export async function initCarousel() {
	const root = document.querySelector("#carousel-root");
	if (!root) return; 
	
	root.classList.add("carousel");
	root.innerHTML = "";

	const prevBtn = createElement("button", { className: "control prev", "aria-label": "Previous slide" }, [
		createElement("span", { className: "material-symbols-sharp", text: "arrow_back" })
	]);
	const nextBtn = createElement("button", { className: "control next", "aria-label": "Next slide" }, [
		createElement("span", { className: "material-symbols-sharp", text: "arrow_forward" })
	]);
	const inner = createElement("div", { className: "carousel-inner", role: "group", "aria-roledescription": "carousel" });
	const dots = createElement("div", { className: "dots", role: "tablist", "aria-label": "Select carousel slide" });

	root.append(prevBtn, inner, nextBtn, dots);

	let posts; 
	try {
		const data = await readPosts({ limit: 3, sort: "created"});
		posts = Array.isArray(data) ? data : (data?.data || data?.posts || []);
		posts = posts.filter(p => p && p.id).slice(0, 3);
	} catch (error) {
		console.error("Carousel failed to fetch posts", error);
		return;
	}

	if (!posts || posts.length === 0) {
		root.textContent = "No featured posts";
		return;
	}

	while (posts.length < 3) posts.push(posts[posts.length - 1]);

	let visible = posts.slice();
	let isAnimating = false;

	function render() {
		inner.innerHTML = "";
		dots.innerHTML = "";
		const roles = ["left", "center", "right"];
		visible.forEach((p, i) => {
			const slide = buildSlide(p, roles[i]);
			inner.appendChild(slide);
		});

		visible.forEach((_, i) => {
			const dot = createElement("button", {
				className: "dot" + (i === 1 ? "active" : ""),
				role: "tab",
				"aria-selected": i === 1 ? "true" : "false",
				"aria-current": i === 1 ? "true" : "false",
			});

			dot.addEventListener("click", () => goToIndex(i));
			dots.appendChild(dot);
		});
	}

	function startAnimation(direction) {
		if (isAnimating) return;
		isAnimating = true;
		root.classList.add("animating");

		setTimeout(() => {
			if (direction === "next") visible = visible.slice(1).concat(visible[0]);
			else visible = [visible[visible.length - 1]].concat(visible.slice(0, visible.length - 1));
			render();
			setTimeout(() => {
				root.classList.remove("animating");
				isAnimating = false;
			}, ANIMTION_DURATION);
			
		}, 60);
	}

	function goToIndex(targetIndex) {
		if (isAnimating) return;
		const diff = targetIndex - 1;
		if (diff === 0) return;
		const direction = diff > 0 ? "next" : "prev";
		const steps = Math.abs(diff);
		(async function doSteps() {
			for (let i = 0; i < steps; i++) {
				startAnimation(direction)
				await new Promise(r => setTimeout(r, ANIMTION_DURATION + 30));
			}
		})();
	}

	prevBtn.addEventListener("click", () => startAnimation("prev"));
	nextBtn.addEventListener("click", () => startAnimation("next"));

	root.addEventListener("keydown", (e) => {
		if (e.key === "ArrowRight") nextBtn.click();
		if (e.key === "ArrowLedt") prevBtn.click();
	})

	render();
}

document.addEventListener("DOMContentLoaded", () => {
	const element = document.querySelector("#carousel-root");
	if (element) initCarousel(element).catch(error => {
		console.error("Carousel init error", error);
		element.textContent = "Carousel unavailable.";
	});
});

export default initCarousel;