document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button-right');
    const prevButton = document.querySelector('.carousel-button-left');
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;

        if (prevSlide) {
            moveToSlide(track, currentSlide, prevSlide);
        }
    });

    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;

        if (nextSlide) {
            moveToSlide(track, currentSlide, nextSlide);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.interactive-item');
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const description = this.querySelector('.description');
            description.classList.add('active');
        });
        item.addEventListener('mouseleave', function() {
            const description = this.querySelector('.description');
            description.classList.remove('active');
        });
    });
});

