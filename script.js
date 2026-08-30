const links = [...document.querySelectorAll('nav a')];
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
    link.style.color = active ? 'var(--ink)' : '';
    link.style.fontWeight = active ? '800' : '';
  });
}, { rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.2, 0.6] });

sections.forEach(section => observer.observe(section));
