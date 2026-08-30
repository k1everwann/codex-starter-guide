// 這個網站本身就是教材：先把會快速過時的「官方延伸閱讀」拿掉，
// 再把目前這個 GitHub Repo 直接插入成一個可操作的實戰章節。
document.querySelector('.sources')?.remove();

const lessonSection = document.querySelector('#lesson');
if (lessonSection) {
  const repoSection = document.createElement('section');
  repoSection.id = 'repo-lab';
  repoSection.className = 'section contrast';
  repoSection.innerHTML = `
    <div class="section-head">
      <span>LAB</span>
      <div>
        <h2>直接拿這個 Repo 學：看得見的專案架構</h2>
        <p>你現在看的教學網站，本身就是一個公開 GitHub 專案。不要只讀概念，直接打開 Repo 對照。</p>
      </div>
    </div>

    <div class="callout">
      <strong>實際教材：</strong>
      <a href="https://github.com/k1everwann/codex-starter-guide" target="_blank" rel="noreferrer">github.com/k1everwann/codex-starter-guide ↗</a>
      <br />網站是成品，Repo 是「成品背後的零件與歷史」。兩邊一起看，會比只背名詞快很多。
    </div>

    <div class="two-col">
      <article class="panel">
        <h3>這個專案真的長這樣</h3>
        <pre><code>codex-starter-guide/
├─ index.html          ← 網站內容與骨架
├─ styles.css          ← 顏色、排版、RWD
├─ script.js           ← 網頁互動
├─ README.md           ← 給 Repo 訪客看的首頁
├─ PROJECT-ARCHITECTURE.md
│                      ← 專案架構導讀
├─ AGENTS.md           ← Codex 的專案規則
├─ CLAUDE.md           ← Claude Code 的專案規則
├─ .gitignore          ← 哪些東西不要進 Git
├─ .env.example        ← Secret / 環境變數範例
└─ .nojekyll           ← GitHub Pages 靜態站設定</code></pre>
      </article>

      <article class="panel explanation">
        <h3>先學會分「程式」和「專案文件」</h3>
        <ol>
          <li><strong>index.html / styles.css / script.js</strong>：真的會影響網站畫面的程式。</li>
          <li><strong>README.md</strong>：第一次進 Repo 的人先看它。</li>
          <li><strong>AGENTS.md / CLAUDE.md</strong>：不是網站內容，而是 AI 工程師做事時要遵守的 SOP。</li>
          <li><strong>.gitignore / .env.example</strong>：開始碰 API、Secret 時很重要。</li>
        </ol>
        <div class="mini">一個專案不只有 Code；文件、規則、版本與部署設定也都是專案的一部分。</div>
      </article>
    </div>

    <div class="flow" aria-label="這個教學網站的部署架構">
      <div class="flow-item accent"><b>你 / AI</b><span>修改檔案</span></div><i>→</i>
      <div class="flow-item"><b>Git Commit</b><span>留下版本</span></div><i>→</i>
      <div class="flow-item"><b>GitHub Repo</b><span>main branch</span></div><i>→</i>
      <div class="flow-item"><b>GitHub Pages</b><span>讀取靜態檔案</span></div><i>→</i>
      <div class="flow-item success"><b>公開網站</b><span>朋友直接開網址</span></div>
    </div>

    <div class="doc-grid">
      <article>
        <h3>① Code：看成品怎麼組成</h3>
        <strong>先點這三個檔案</strong>
        <p><a href="https://github.com/k1everwann/codex-starter-guide/blob/main/index.html" target="_blank" rel="noreferrer">index.html ↗</a> 看文字與區塊；<a href="https://github.com/k1everwann/codex-starter-guide/blob/main/styles.css" target="_blank" rel="noreferrer">styles.css ↗</a> 看外觀；<a href="https://github.com/k1everwann/codex-starter-guide/blob/main/script.js" target="_blank" rel="noreferrer">script.js ↗</a> 看互動。</p>
      </article>
      <article>
        <h3>② 文件：看「人」和「AI」各讀什麼</h3>
        <strong>README vs Rules</strong>
        <p><a href="https://github.com/k1everwann/codex-starter-guide/blob/main/README.md" target="_blank" rel="noreferrer">README.md ↗</a> 給人看；<a href="https://github.com/k1everwann/codex-starter-guide/blob/main/AGENTS.md" target="_blank" rel="noreferrer">AGENTS.md ↗</a> 與 <a href="https://github.com/k1everwann/codex-starter-guide/blob/main/CLAUDE.md" target="_blank" rel="noreferrer">CLAUDE.md ↗</a> 給 AI 看。</p>
      </article>
      <article>
        <h3>③ History：看 Git 真正在記什麼</h3>
        <strong>Commit = 存檔點</strong>
        <p><a href="https://github.com/k1everwann/codex-starter-guide/commits/main/" target="_blank" rel="noreferrer">打開 Commits ↗</a>，你會看到網站不是「一份最終檔案」，而是一連串有時間、有訊息、有差異的版本。</p>
      </article>
    </div>

    <div class="two-col">
      <article class="panel">
        <h3>5 分鐘 GitHub 練習</h3>
        <ol>
          <li>先開 Repo 首頁，找出預設 Branch：<code>main</code>。</li>
          <li>打開 <code>index.html</code>，搜尋網站上一句你看得到的文字。</li>
          <li>打開 <code>styles.css</code>，找 <code>.hero</code> 或 <code>.panel</code>，理解 CSS 是怎麼套到 HTML。</li>
          <li>打開 Commits，點一個版本看「哪幾行被加進去」。</li>
          <li>回到公開網站，理解 GitHub Pages 顯示的就是 main 裡的成品。</li>
        </ol>
      </article>
      <article class="panel">
        <h3>直接拿 Repo 給 Codex / Claude 練 Plan</h3>
        <pre><code>請先不要修改程式。

閱讀這個專案：
https://github.com/k1everwann/codex-starter-guide

請告訴我：
1. 專案入口是哪個檔案？
2. HTML / CSS / JS 各負責什麼？
3. README、AGENTS.md、CLAUDE.md 的讀者有何不同？
4. GitHub Pages 如何把這個 Repo 變成網站？
5. 如果我要新增一個章節，你預計改哪些檔案？</code></pre>
      </article>
    </div>

    <div class="callout">
      <strong>這就是「活教材」：</strong>之後每次我們改這個教學網站，你都可以回 GitHub 看新的 commit 與 diff。網站本身的成長，就是 Git / GitHub / AI Coding 工作流的實際紀錄。
    </div>
  `;

  lessonSection.before(repoSection);

  const nav = document.querySelector('.topbar nav');
  const lessonLink = nav?.querySelector('a[href="#lesson"]');
  if (nav && lessonLink) {
    const repoLink = document.createElement('a');
    repoLink.href = '#repo-lab';
    repoLink.textContent = 'Repo 實戰';
    nav.insertBefore(repoLink, lessonLink);
  }
}

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
