// ======================================
// Temple Data Array
// ======================================
const temples = [
  { name: "Aba Nigeria", location: "Aba, Nigeria", dedicated: "2005, August, 7", area: 11500, image: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg" },
  { name: "Manti Utah", location: "Manti, Utah, United States", dedicated: "1888, May, 21", area: 74792, image: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg" },
  { name: "Payson Utah", location: "Payson, Utah, United States", dedicated: "2015, June, 7", area: 96630, image: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg" },
  { name: "Yigo Guam", location: "Yigo, Guam", dedicated: "2020, May, 2", area: 6861, image: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg" },
  { name: "Washington D.C.", location: "Kensington, Maryland, United States", dedicated: "1974, November, 19", area: 156558, image: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg" },
  { name: "Lima Perú", location: "Lima, Perú", dedicated: "1986, January, 10", area: 9600, image: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg" },
  { name: "Mexico City Mexico", location: "Mexico City, Mexico", dedicated: "1983, December, 2", area: 116642, image: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg" },
  { name: "Tokyo Japan", location: "Tokyo, Japan", dedicated: "1980, October, 27", area: 37000, image: "images/japan.jpeg" },
  { name: "Salt Lake City Utah", location: "Salt Lake City, Utah, United States", dedicated: "1893, April, 6", area: 253000, image: "images/utah.jpeg" },
  { name: "Accra Ghana", location: "Accra, Ghana", dedicated: "2004, January, 11", area: 16500, image: "images/ghana.jpeg" }
];

// ======================================
// DOMContentLoaded
// ======================================
document.addEventListener('DOMContentLoaded', () => {
  // --------------------------
  // Footer Setup
  // --------------------------
  const yearEl = document.getElementById('currentyear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lastModifiedEl = document.getElementById('lastmodified');
  if (lastModifiedEl) {
    const lm = document.lastModified;
    lastModifiedEl.textContent = lm && lm.trim() !== "" ? lm : new Date().toLocaleString();
  }

  // --------------------------
  // Hamburger Menu Toggle
  // --------------------------
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  const hamburgerIcon = hamburger ? hamburger.querySelector('.hamburger-icon') : null;

  function setHamburgerState(open) {
    if (!hamburger || !nav) return;
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      nav.classList.add('open');
      if (hamburgerIcon) hamburgerIcon.textContent = '✕';
      hamburger.setAttribute('aria-label', 'Close navigation');
    } else {
      nav.classList.remove('open');
      if (hamburgerIcon) hamburgerIcon.textContent = '☰';
      hamburger.setAttribute('aria-label', 'Open navigation');
    }
  }

  if (hamburger && nav) {
    setHamburgerState(false);
    hamburger.addEventListener('click', () => {
      setHamburgerState(!nav.classList.contains('open'));
    });

    nav.addEventListener('click', (e) => {
      if (e.target && e.target.tagName === 'A' && nav.classList.contains('open')) setHamburgerState(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) setHamburgerState(false);
    });

    const mq = window.matchMedia('(min-width: 48rem)');
    function handleMq(e) {
      if (e.matches) {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        if (hamburgerIcon) hamburgerIcon.textContent = '☰';
      }
    }
    mq.addEventListener ? mq.addEventListener('change', handleMq) : mq.addListener(handleMq);
  }

  // --------------------------
  // Render Temples
  // --------------------------
  const gallery = document.querySelector('.gallery');

  function renderTemples(list) {
    if (!gallery) return;
    gallery.innerHTML = "";
    list.forEach(t => {
      const fig = document.createElement('figure');
      fig.className = 'temple';

      const img = document.createElement('img');
      img.src = t.image;
      img.alt = t.name;
      img.loading = "lazy";
      img.width = 600;
      img.height = 400;

      const caption = document.createElement('figcaption');
      caption.textContent = `${t.name} — ${t.location} (Dedicated: ${t.dedicated}, Area: ${t.area} sq ft)`;

      fig.appendChild(img);
      fig.appendChild(caption);
      gallery.appendChild(fig);
    });
  }

  renderTemples(temples); // initial render

  // --------------------------
  // Temple Filtering
  // --------------------------
  function filterTemples(criteria) {
    return temples.filter(t => {
      const year = parseInt(t.dedicated.split(',')[0], 10);
      switch(criteria) {
        case "old": return year < 1900;
        case "new": return year > 2000;
        case "large": return t.area > 90000;
        case "small": return t.area < 10000;
        default: return true; // home
      }
    });
  }

  const navLinks = document.querySelectorAll('.nav-list a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = link.textContent.trim().toLowerCase();
      renderTemples(filterTemples(filter));
    });
  });
});
