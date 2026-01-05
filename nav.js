document.addEventListener('DOMContentLoaded', function () {
  try {
    var page = location.pathname.split('/').pop();
    if (!page || page === '') page = 'index.html';

    var navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      var hrefFile = href.split('/').pop();
      
      if (hrefFile === page) {
        link.parentElement.classList.add('active');
      }
    });
  } catch (e) {
    console.error('Nav highlight error:', e);
  }
});
