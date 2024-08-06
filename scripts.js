document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded and running'); // Add this line
    var path = window.location.pathname.split("/").pop(); // Get the current page file name
    if (path === '') {
        path = 'index.html'; // Default to index.html if path is empty
    }
    var navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(function(link) {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });
});

let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        navbar.classList.add('navbar-hidden');
    } else {
        navbar.classList.remove('navbar-hidden');
    }
    lastScrollTop = scrollTop;
});
