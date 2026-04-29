document.addEventListener('DOMContentLoaded', function () {
  console.log('Script loaded and running');

  // Highlight active nav link
  let path = window.location.pathname.split("/").pop();
  if (path === '') path = 'index.html';

  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(function (link) {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });

  // Hide navbar when scrolling down, show when scrolling up
  let lastScrollY = window.scrollY;
  const nav = document.querySelector('nav');

  if (nav) {
    window.addEventListener('scroll', function () {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        nav.classList.add('nav-hidden');
      } else {
        nav.classList.remove('nav-hidden');
      }

      lastScrollY = currentScrollY;
    });
  }
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