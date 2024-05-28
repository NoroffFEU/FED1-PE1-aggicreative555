
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


const hamburger = document.querySelectorAll("#menu-icon");
const navMenu = document.querySelectorAll("#nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
})

