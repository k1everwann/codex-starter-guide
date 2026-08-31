# Codex / Claude 工程入門指南

這不是單純的一個教學網站。**這個 GitHub Repo 本身就是教材。**

主要只有兩個入口：

- 🌐 完整教學網站：<https://k1everwann.github.io/codex-starter-guide/>
- 🐙 GitHub Repo：<https://github.com/k1everwann/codex-starter-guide>

教學網站從 AI Coding、Git / GitHub、Python、Data / API、Connector 一路往下，途中可以直接執行 Python / SQLite，後半段再接 Gmail + Google Drive Hands-on Lab。

## 建議怎麼學

1. 先開主教學網站，分清楚 Model、Reasoning、Work Mode 與 Agent。
2. 做一次 10 分鐘 Git 練習：Branch → Commit → Pull Request → Merge。
3. 在 Python / SQL Playground 改一行程式，按 Run 看結果。
4. 回到這個 Repo，看 `index.html`、`ai-guide.html`、`styles.css`、`script.js`，對照實際畫面。
5. 看 Commits，理解 Git 真正在保存的是什麼。
6. 回到主教學網站的 `Hands-on Lab`，從 GCP Project、API、OAuth 一路做到 Apps Script Web App。
7. 最後把自己的旅遊網站照同樣方式整理、擴充。

👉 更完整的專案導讀請看：[PROJECT-ARCHITECTURE.md](./PROJECT-ARCHITECTURE.md)

---

## Hands-on：真的做一個 Gmail + Google Drive 網站

主教學網站往下滑到 Hands-on Lab，就會直接依序看到：

```text
建立 Standard GCP Project
        ↓
Enable Gmail API + Drive API
        ↓
Google Auth / OAuth
        ↓
Apps Script 綁 Project Number
        ↓
Frontend + Backend
        ↓
GmailApp / DriveApp
        ↓
Deploy Web App
        ↓
自己的 Travel Workspace Dashboard
```

實作會用到：

- 完整步驟：[labs/google-workspace-webapp/README.md](./labs/google-workspace-webapp/README.md)
- Backend：[Code.gs](./labs/google-workspace-webapp/Code.gs)
- Frontend：[Index.html](./labs/google-workspace-webapp/Index.html)

做完後會碰到：Frontend、Backend、GCP Project、API enablement、OAuth、Permission、Gmail、Drive、Error handling、Deploy。

---

## 這個專案的結構

```text
codex-starter-guide/
├─ index.html                    ← 主教學網站骨架
├─ ai-guide.html                 ← AI 模型 / 推理 / 工作模式導讀
├─ git-practice.html             ← Git / PR 小實作
├─ playgrounds.html              ← Python / SQL 互動練習內容
├─ lab-content.html              ← 主頁內載入的完整 Hands-on Lab
├─ final-challenge.html          ← 最後挑戰
├─ google-workspace-lab.html     ← 舊網址相容轉址
├─ styles.css                    ← 主網站外觀、排版、RWD
├─ playgrounds.css               ← 互動練習區樣式
├─ script.js                     ← 組合教學片段與導覽互動
├─ playgrounds.js                ← 瀏覽器內執行 Python / SQLite
├─ README.md                     ← Repo 的入口
├─ PROJECT-ARCHITECTURE.md       ← 專案架構導讀
├─ AGENTS.md                     ← Codex 的專案規則
├─ CLAUDE.md                     ← Claude Code 的專案規則
├─ labs/
│  └─ google-workspace-webapp/
│     ├─ README.md               ← GCP → Gmail / Drive 完整步驟
│     ├─ Code.gs                 ← Apps Script Backend
│     └─ Index.html              ← Apps Script Frontend
├─ .gitignore                    ← 不要進 Git 的檔案
├─ .env.example                  ← Secret / 環境變數範例
└─ .nojekyll                     ← GitHub Pages 靜態站設定
```

最先記住：

```text
HTML        = 內容與結構
CSS         = 外觀
JavaScript  = 互動 / 組合頁面片段
README      = 給人看的入口
AGENTS      = 給 Codex 的 SOP
CLAUDE      = 給 Claude Code 的 SOP
Git         = 保存版本
GitHub      = 放 Repo 與協作
Pages       = 把 main 發布成網站
GCP Project = API / OAuth / Cloud 設定所在的位置
```

---

## 這個網站會教什麼

- Model / Agent / Reasoning / Work Mode 的差別
- Claude Code 的 Haiku / Sonnet / Opus / Fable 5 定位
- ChatGPT GPT-5.6 的 Luna / Sol / Sol Pro 與推理強度概念
- Claude Code Plan Mode 與 Codex Plan / Default 的概念
- Git 與 GitHub
- GitHub Pages
- Notion、README.md、AGENTS.md、CLAUDE.md 的分工
- Issue、Branch、Pull Request
- Test、Secret、Deploy、Log
- Python：只學到看得懂 AI 寫的程式
- 瀏覽器內可直接執行的 Python Playground
- SQLite / SQL Playground 與 API 概念
- Gmail / Google Drive / Notion Connector 與 MCP
- GCP Project、Google Workspace API、OAuth 的完整實作流程

## Python 為什麼只教概念？

現在 AI 可以幫你寫大量程式，所以第一階段不需要把時間花在背語法。

至少要能看懂：變數、List / Dictionary、`if`、`for`、function、import、Error / Traceback。

目標是：**AI 負責寫，你負責看懂大意、判斷方向、驗證結果。**

---

## 這個 Repo 怎麼變成網站？

```text
你 / Codex / Claude
        ↓
修改程式
        ↓
Git commit
        ↓
GitHub main branch
        ↓
GitHub Pages
        ↓
https://k1everwann.github.io/codex-starter-guide/
```

GitHub Pages 不是另一份網站；它就是這個 Repo 的靜態檔案發布結果。

---

## 直接拿這個 Repo 練 AI Plan Mode

```text
請先不要修改程式。

閱讀這個專案：
https://github.com/k1everwann/codex-starter-guide

請告訴我：
1. 專案入口是哪個檔案？
2. 主頁如何載入 AI 導讀、Git 練習、Playground 與 Hands-on Lab？
3. README、AGENTS.md、CLAUDE.md 的讀者有何不同？
4. GitHub Pages 如何把這個 Repo 變成網站？
5. 如果我要新增一個章節，你預計改哪些檔案？
```

重點不是讓 AI 馬上改，而是練習：**先讀現況 → 分析 → 提出計畫 → 再執行。**