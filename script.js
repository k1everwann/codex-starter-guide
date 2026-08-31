async function fetchFragment(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);

  const wrapper = document.createElement('div');
  wrapper.innerHTML = await response.text();
  const fragment = document.createDocumentFragment();
  [...wrapper.children].forEach((node) => fragment.appendChild(node));
  return fragment;
}

function loadLocalScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      else existing.addEventListener('load', resolve, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      resolve();
    }, { once: true });
    script.addEventListener('error', reject, { once: true });
    document.head.appendChild(script);
  });
}

async function loadGitPractice() {
  const git = document.querySelector('#git');
  if (!git) return;

  try {
    git.after(await fetchFragment('./git-practice.html'));
  } catch (error) {
    console.error('Failed to load Git practice:', error);
  }
}

async function loadPlaygrounds() {
  const python = document.querySelector('#python');
  const data = document.querySelector('#data');
  if (!python || !data) return;

  try {
    const response = await fetch('./playgrounds.html');
    if (!response.ok) throw new Error(`playgrounds.html: HTTP ${response.status}`);

    const wrapper = document.createElement('div');
    wrapper.innerHTML = await response.text();
    const pythonPlayground = wrapper.querySelector('#python-playground');
    const sqlPlayground = wrapper.querySelector('#sql-playground');

    if (pythonPlayground) python.after(pythonPlayground);
    if (sqlPlayground) data.after(sqlPlayground);

    await loadLocalScript('./playgrounds.js');
    window.initInteractivePlaygrounds?.();
  } catch (error) {
    console.error('Failed to load interactive playgrounds:', error);
  }
}

function makeFigure(src, alt, caption) {
  const figure = document.createElement('figure');
  figure.className = 'guide-figure wide';
  figure.innerHTML = `
    <img src="${src}" alt="${alt}" loading="lazy" />
    <figcaption>${caption}</figcaption>
  `;
  return figure;
}

function addCheckpoint(sectionId, text) {
  const section = document.querySelector(`#${sectionId}`);
  if (!section || section.querySelector('.checkpoint')) return;

  const checkpoint = document.createElement('div');
  checkpoint.className = 'checkpoint';
  checkpoint.innerHTML = `
    <strong>✓ 做到這裡，你應該看到</strong>
    <span>${text}</span>
  `;
  section.appendChild(checkpoint);
}

function enhanceLab() {
  const gcp = document.querySelector('#lab-gcp');
  if (gcp && !gcp.querySelector('.guide-figure')) {
    const target = gcp.querySelector('table') || gcp.querySelector('ol');
    target?.after(makeFigure(
      './assets/gcp-project-map.svg',
      'Google Cloud Project 設定示意，標出 Project selector 與 Project number',
      '不用記整個 Cloud Console。這一步只先會找到 Project、Project ID 與最重要的 Project number。'
    ));
  }

  const api = document.querySelector('#lab-api');
  if (api && !api.querySelector('.api-clarity')) {
    const note = document.createElement('div');
    note.className = 'note quiet api-clarity';
    note.innerHTML = `
      <strong>這裡先把 API 的關係講精準</strong>
      <span><code>DriveApp</code> 在 Standard Cloud Project 下需要啟用 Drive API。<code>GmailApp</code> 則是 Apps Script 的 built-in service；這裡同時啟用 Gmail API，是讓你看懂 Cloud 的 API 管理，也為未來直接用 Gmail REST API / Advanced Service 做準備。不要把「GmailApp 能跑」簡化成「因為手動開了 Gmail API」。</span>
    `;
    api.appendChild(note);
  }

  const appsScript = document.querySelector('#lab-apps-script');
  if (appsScript && !appsScript.querySelector('.guide-figure')) {
    const target = appsScript.querySelector('ol');
    target?.after(makeFigure(
      './assets/apps-script-map.svg',
      'Apps Script 專案設定與部署位置示意',
      '介面改版時文字位置可能會變，但你要找的概念只有兩個：Project Settings 裡綁 Cloud Project，以及右上角 Deploy。'
    ));
  }

  const checkpoints = {
    'lab-gcp': 'Cloud Console 裡看得到 Project name、Project ID、Project number，而且你已經把「純數字的 Project number」記下來。',
    'lab-api': 'Enabled APIs & services 裡 Drive API 顯示 Enabled；這個 Lab 也把 Gmail API 打開，讓後面能理解 Google API 的管理方式。',
    'lab-auth': 'Google Auth Platform 看得到你的 App name；如果使用 External，自己的 Google 帳號已經出現在 Test users。',
    'lab-apps-script': 'Apps Script 的 Project Settings → Google Cloud Project 顯示剛才建立的 Standard Project / Project number。',
    'lab-code': 'Apps Script Editor 裡同時有 <code>Code.gs</code> 和 <code>Index.html</code>，而且儲存時沒有明顯語法錯誤。',
    'lab-authorize': '<code>testAccess</code> 執行完成，Execution log 沒有紅色 Error。第一次跳出 Google 權限視窗是正常的。',
    'lab-deploy': '你拿到一個 Web App URL（通常以 <code>/exec</code> 結尾），而且存取範圍沒有開得比自己練習所需更大。',
    'lab-test': 'Drive 至少能找到一個你知道存在的檔案。Gmail 如果是 0 筆不一定壞掉，先換成自己信箱真的有的主旨關鍵字。',
    'lab-debug': '你能先說出問題比較像 Browser、Apps Script、還是 GCP / OAuth，再決定要不要叫 AI 改 code。',
    'lab-next': '只挑 A～E 其中一個小功能繼續做。第一次不要五個都做，留下一個「我知道下一步是什麼」就很好。'
  };

  Object.entries(checkpoints).forEach(([id, text]) => addCheckpoint(id, text));
}

async function loadIntegratedLab() {
  const lab = document.querySelector('#lab');
  if (!lab) return;

  try {
    lab.after(await fetchFragment('./lab-content.html'));
    lab.dataset.integrated = 'true';
    enhanceLab();
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

async function loadFinalChallenge() {
  try {
    const challenge = await fetchFragment('./final-challenge.html');
    const labNext = document.querySelector('#lab-next');
    const roadmap = document.querySelector('#roadmap');

    if (labNext) {
      labNext.after(challenge);
    } else if (roadmap) {
      roadmap.before(challenge);
    }
  } catch (error) {
    console.error('Failed to load final challenge:', error);
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
    let activeHref = `#${id}`;
    if (id === 'git-practice') activeHref = '#git';
    if (id === 'python-playground') activeHref = '#python';
    if (id === 'sql-playground') activeHref = '#data';
    if (id.startsWith('lab-') || id === 'final-challenge') activeHref = '#lab';

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

async function boot() {
  await loadGitPractice();
  await loadPlaygrounds();
  await loadIntegratedLab();
  await loadFinalChallenge();
  setupSectionObserver();
}

boot();