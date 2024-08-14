document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded and running');
    var path = window.location.pathname.split("/").pop();
    if (path === '') {
        path = 'index.html';
    }
    var navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(function(link) {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });
});

// Handle navbar visibility on scroll
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

// EmailJS integration
function sendEmail(form) {
    emailjs.send("your_service_id", "your_template_id", {
        from_name: form.firstname.value + " " + form.lastname.value,
        to_name: "Speedpack Express",
        message: form.question.value,
        reply_to: form.email.value,
        from_email: form.email.value,
    }).then(function(response) {
        alert('SUCCESS!', response.status, response.text);
    }, function(error) {
        alert('FAILED...', error);
    });
}
