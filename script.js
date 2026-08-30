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
