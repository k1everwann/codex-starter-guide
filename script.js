const isWorkspaceLab = location.pathname.endsWith('/google-workspace-lab.html');

if (!isWorkspaceLab) {
  const sidebarLinks = document.querySelector('.sidebar-links');
  if (sidebarLinks) {
    const labLink = document.createElement('a');
    labLink.href = './google-workspace-lab.html';
    labLink.textContent = 'Hands-on: Gmail + Drive →';
    sidebarLinks.prepend(labLink);
  }

  const intro = document.querySelector('#overview');
  if (intro) {
    const labNote = document.createElement('div');
    labNote.className = 'note quiet';
    labNote.innerHTML = '<strong>想直接動手？</strong><span><a href="./google-workspace-lab.html">Google Workspace Hands-on Lab →</a>：從 GCP Project、API、OAuth 一路做到自己的 Gmail + Drive Web App。</span>';
    intro.appendChild(labNote);
  }
}

const links = [...document.querySelectorAll('.sidebar nav a')];
const sections = links
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  links.forEach(link => {
    const active = link.getAttribute('href') === `#${visible.target.id}`;
    link.style.color = active ? 'var(--text)' : '';
    link.style.fontWeight = active ? '650' : '';
  });
}, {
  rootMargin: '-18% 0px -68% 0px',
  threshold: [0, 0.2, 0.6]
});

sections.forEach(section => observer.observe(section));
