async function loadIntegratedLab() {
  const lab = document.querySelector('#lab');
  if (!lab) return;

  // Main guide should stay on one page: remove links that send readers to
  // the old standalone lab page and point the intro directly to this section.
  document
    .querySelectorAll('a[href="./google-workspace-lab.html"]')
    .forEach((link) => {
      if (link.closest('.sidebar-links')) {
        link.remove();
      } else {
        link.href = '#lab';
        if (link.closest('.intro-links')) {
          link.textContent = '直接做 Gmail + Drive Lab →';
        } else {
          link.innerHTML = '<strong>從 Step 1：建立 GCP Project 開始 ↓</strong>';
        }
      }
    });

  try {
    const response = await fetch('./lab-content.html');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const html = await response.text();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    const fragment = document.createDocumentFragment();
    [...wrapper.children].forEach((section) => fragment.appendChild(section));
    lab.after(fragment);
    lab.dataset.integrated = 'true';
  } catch (error) {
    const note = document.createElement('div');
    note.className = 'note quiet';
    note.innerHTML = `
      <strong>Lab 內容載入失敗</strong>
      <span>可以先從 Repo 的 <a href="https://github.com/k1everwann/codex-starter-guide/tree/main/labs/google-workspace-webapp" target="_blank" rel="noreferrer">Google Workspace Lab 原始碼 ↗</a> 開始。</span>
    `;
    lab.appendChild(note);
    console.error('Failed to load integrated lab:', error);
  }
}

function setupSectionObserver() {
  const links = [...document.querySelectorAll('.sidebar nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    const id = visible.target.id;
    const activeHref = id.startsWith('lab-') ? '#lab' : `#${id}`;

    links.forEach((link) => {
      const active = link.getAttribute('href') === activeHref;
      link.style.color = active ? 'var(--text)' : '';
      link.style.fontWeight = active ? '650' : '';
    });
  }, {
    rootMargin: '-18% 0px -68% 0px',
    threshold: [0, 0.2, 0.6]
  });

  sections.forEach((section) => observer.observe(section));
}

loadIntegratedLab().finally(setupSectionObserver);
