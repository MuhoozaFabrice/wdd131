// temples.js

document.addEventListener('DOMContentLoaded', () => {
  // 1) Footer: set copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    const now = new Date();
    yearEl.textContent = now.getFullYear();
  }

  // 2) Footer: set last modified using document.lastModified (if available)
  const lastModifiedEl = document.getElementById('lastmodified');
  if (lastModifiedEl) {
    // document.lastModified may be an empty string in some environments; handle gracefully
    const lm = document.lastModified;
    if (lm && lm.trim() !== "") {
      // some browsers return a timestamp string; show it directly
      lastModifiedEl.textContent = lm;
    } else {
      // fallback: use current date/time as "unknown"
      lastModifiedEl.textContent = new Date().toLocaleString();
    }
  }

  // 3) Hamburger menu toggle (mobile)
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  const hamburgerIcon = hamburger ? hamburger.querySelector('.hamburger-icon') : null;

  function setHamburgerState(open) {
    if (!hamburger || !nav) return;
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      nav.classList.add('open');
      if (hamburgerIcon) hamburgerIcon.textContent = '✕'; // show an X
      hamburger.setAttribute('aria-label', 'Close navigation');
    } else {
      nav.classList.remove('open');
      if (hamburgerIcon) hamburgerIcon.textContent = '☰';
      hamburger.setAttribute('aria-label', 'Open navigation');
    }
  }

  if (hamburger && nav) {
    // start closed
    setHamburgerState(false);

    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.contains('open');
      setHamburgerState(!isOpen);
    });

    // close the menu when a nav link is clicked (mobile UX)
    nav.addEventListener('click', (e) => {
      if (e.target && e.target.tagName === 'A' && nav.classList.contains('open')) {
        setHamburgerState(false);
      }
    });

    // Close menu when user presses Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setHamburgerState(false);
      }
    });

    // If the viewport is resized to large, ensure nav is visible normally and hamburger state reset
    const mq = window.matchMedia('(min-width: 48rem)');
    function handleMq(e) {
      if (e.matches) {
        // large: remove mobile-only open state (nav will be shown via CSS)
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        if (hamburgerIcon) hamburgerIcon.textContent = '☰';
      }
    }
    mq.addEventListener ? mq.addEventListener('change', handleMq) : mq.addListener(handleMq);
  }
});
