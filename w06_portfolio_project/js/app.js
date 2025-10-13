// js/app.js (ES module)

// **********************************************
// NOTE: The 'projects' array has been removed.
// Project data will now be read from the HTML.
// **********************************************

/* ---------- DOM refs ---------- */
// No change to DOM refs, but 'projectGrid' will now contain the static HTML projects.
const projectGrid = document.getElementById('projectGrid') || document.getElementById('projectGridAll');
const modalRoot = document.getElementById('modalRoot');
const showAllBtn = document.getElementById('showAll');
const showFeaturedBtn = document.getElementById('showFeatured');
const themeToggle = document.getElementById('themeToggle') || document.getElementById('themeToggle2') || document.getElementById('themeToggle3') || document.getElementById('themeToggle4');

const imageUpload = document.getElementById('imageUpload');
const heroPreview = document.getElementById('heroPreview');
const applyPaletteBtn = document.getElementById('applyPaletteBtn');
const resetPaletteBtn = document.getElementById('resetPaletteBtn');

// This array will store the parsed project data from the HTML
let projectsData = []; 

/* ---------- Utilities (No Change) ---------- */
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v]) => { if (k === 'class') node.className = v; else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v); else node.setAttribute(k,v); });
  (Array.isArray(children) ? children : [children]).forEach(c => { if (typeof c === 'string') node.innerHTML += c; else if (c) node.appendChild(c); });
  return node;
}

// ---------------------------------------------
// NEW: Function to parse project data from HTML
// ---------------------------------------------
function initProjects() {
    if (!projectGrid) return;
    
    // Select all project cards that are already in the HTML
    const projectCards = projectGrid.querySelectorAll('.project-card');
    
    // Convert NodeList to Array and extract data from each card
    projectsData = Array.from(projectCards).map((card, index) => {
        // Find elements inside the card
        const imgEl = card.querySelector('img');
        const titleEl = card.querySelector('h3');
        const summaryEl = card.querySelector('p');
        
        // Extract data, using card attributes for extra info (like 'featured')
        const project = {
            id: index + 1, // Simple ID based on order
            title: titleEl ? titleEl.textContent : 'Untitled Project',
            summary: summaryEl ? summaryEl.textContent : 'No summary provided.',
            img: imgEl ? imgEl.getAttribute('src') : '',
            // Read 'data-featured' attribute from the <article>
            featured: card.dataset.featured === 'true', 
            // In a real app, you might read tags from a data-tag attribute
            tags: [] 
        };

        // Add the event listener for the 'View' button on the static HTML card
        const viewBtn = card.querySelector('.btn.small');
        if(viewBtn) {
             viewBtn.addEventListener('click', () => openModal(project));
        }

        return project;
    });
}

/* ---------- Render projects (Modified for filtering) ---------- */
function renderProjects(list = projectsData) {
    if (!projectGrid) return;

    // Reset visibility of all project cards
    const allCards = projectGrid.querySelectorAll('.project-card');
    allCards.forEach(card => card.style.display = 'none');
    
    // Loop through the filtered list and show only those cards
    list.forEach(p => {
        // Since we stored the project's index in the map above, we can target it.
        // A better way would be to use a unique ID attribute on the HTML card.
        // For simplicity, we'll find the card by its title/index for now.
        const cardToShow = projectGrid.querySelectorAll('.project-card')[p.id - 1];
        if (cardToShow) {
            cardToShow.style.display = ''; // Show the card
        }
    });
}


/* ---------- Modal (Modified) ---------- */
function openModal(project) {
    const modal = el('div',{class:'modal-root'});
    const box = el('div',{class:'modal'}, [
        el('button',{class:'close', onClick: ()=> { modal.remove(); }}, '✕'),
        el('h2',{}, project.title),
        el('p',{}, project.summary),
        // The image element is still created by JS for the modal
        el('img',{src: project.img, alt: project.title, loading:'lazy'}) 
    ]);
    modal.appendChild(box);
    document.body.appendChild(modal);
}

// ... (Rest of the code: Theme toggle, Color extraction, File upload, Contact form, etc. remains the same)

/* ---------- Init (Modified) ---------- */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize projects by reading from the HTML
    initProjects();
    
    // 2. Initial render: filter to only show featured projects
    renderProjects(projectsData.filter(p => p.featured));

    // 3. Set up theme and palette
    restorePalette();
    initTheme();
    
    // 4. Set up filtering buttons
    if (showAllBtn) showAllBtn.addEventListener('click', () => renderProjects(projectsData));
    if (showFeaturedBtn) showFeaturedBtn.addEventListener('click', () => renderProjects(projectsData.filter(p => p.featured)));
});