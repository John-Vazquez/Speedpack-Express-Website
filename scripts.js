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

// Shared Speedpack footer for all pages
document.addEventListener("DOMContentLoaded", function () {
  const footerHTML = `
    <footer class="site-footer">
      <p>
        Copyright © 2026 Speedpack Express Inc. All Rights Reserved. |
        Designed &amp; Developed by
        <a href="https://www.linkedin.com/in/john-r-vazquez" target="_blank" rel="noopener noreferrer">John R Vazquez</a>
      </p>

      <p class="legal-footer" aria-label="Legal links">
        <a href="privacy.html">Privacy Policy</a>
        <span aria-hidden="true">|</span>
        <a href="terms.html">Terms &amp; Conditions</a>
        <span aria-hidden="true">|</span>
        <a href="accessibility.html">Accessibility Statement</a>
        <span aria-hidden="true">|</span>
        <a href="contact.html">Contact</a>
      </p>

      <p class="footer-small-print">
        Information on this website is provided for general business purposes only. Quotes, deadlines, and service availability
        must be confirmed directly with Speedpack Express. Customers are responsible for providing accurate shipment details
        and complying with applicable laws and shipment restrictions.
      </p>
    </footer>
  `;

  const existingFooter = document.querySelector("footer");

  if (existingFooter) {
    existingFooter.outerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML("beforeend", footerHTML);
  }
});