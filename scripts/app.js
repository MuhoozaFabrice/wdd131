// app.js (module)
const projectListEl = document.getElementById('projectList');
const themeToggle = document.getElementById('themeToggle');

// ----------------- Data (objects & array) -----------------
const projects = [
  {
    id: 1,
    title: "White Water Rafting",
    summary: "Responsive site for a rafting business with booking form.",
    tags: ["HTML","CSS","JS"],
    img: "assets/images/project1-800.webp",
    featured: true
  },
  {
    id: 2,
    title: "Portfolio",
    summary: "Personal portfolio demonstrating responsive design.",
    tags: ["HTML","CSS","JS"],
    img: "assets/images/project2-800.webp",
    featured: true
  },
  // add more project objects
];

// ----------------- Utility functions (more than one) -----------------
function buildProjectCard(project) {
  // uses template literals exclusively for output building
  return `
    <article class="project-card" data-id="${project.id}">
      <img src="${project.img}" alt="${project.title} screenshot" loading="lazy" width="600" height="340">
      <h4>${project.title}</h4>
      <p>${project.summary}</p>
      <p><strong>Tags:</strong> ${project.tags.join(', ')}</p>
      <button class="viewBtn" data-id="${project.id}">View</button>
    </article>
  `;
}

function renderProjects(list) {
  // use array method map -> join
  projectListEl.innerHTML = list.map(buildProjectCard).join('');
}

// Conditional branching example: filter featured or show all
function showFeatured(onlyFeatured = true) {
  if (onlyFeatured) {
    const featured = projects.filter(p => p.featured);
    renderProjects(featured);
  } else {
    renderProjects(projects);
  }
}

// DOM interaction: event delegation for buttons
projectListEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.viewBtn');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const project = projects.find(p => p.id === id);
  if (project) showProjectModal(project);
});

// Modal (simple) — demonstrates selecting & modifying elements
function showProjectModal(project) {
  // create modal element
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content" role="dialog" aria-modal="true" aria-label="${project.title}">
      <button class="close">Close</button>
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <p>Tags: ${project.tags.join(', ')}</p>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector('.close').focus();
  modal.querySelector('.close').addEventListener('click', () => modal.remove());
}

// localStorage: theme preference and draft form content
function saveThemePreference(isDark) {
  localStorage.setItem('prefersDark', JSON.stringify(isDark));
}
function loadThemePreference() {
  const val = JSON.parse(localStorage.getItem('prefersDark'));
  if (val) document.body.classList.add('theme-dark');
}

// Toggle theme with event listener + storage
themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('theme-dark');
  themeToggle.setAttribute('aria-pressed', String(isDark));
  saveThemePreference(isDark);
});

// Contact form draft saving
const formDraftKey = 'contactDraft';
const contactForm = document.querySelector('form#contactForm');
if (contactForm) {
  // restore draft
  const draft = JSON.parse(localStorage.getItem(formDraftKey) || '{}');
  if (draft) {
    Object.entries(draft).forEach(([name, val]) => {
      const el = contactForm.elements[name];
      if (el) el.value = val;
    });
  }

  // save draft on input
  contactForm.addEventListener('input', () => {
    const data = {};
    Array.from(contactForm.elements).forEach(e => {
      if (e.name) data[e.name] = e.value;
    });
    localStorage.setItem(formDraftKey, JSON.stringify(data));
  });

  // submit with validation (conditional branching)
  contactForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const name = contactForm.elements['name'].value.trim();
    const email = contactForm.elements['email'].value.trim();
    if (!name || !email.includes('@')) {
      alert('Please provide a valid name and email.');
      return; // conditional branching: stops when invalid
    }
    // pretend to send, then clear draft
    localStorage.removeItem(formDraftKey);
    contactForm.reset();
    alert('Message sent — demo only.');
  });
}

// Init
loadThemePreference();
showFeatured(true);
