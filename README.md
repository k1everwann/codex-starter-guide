# Codex / Claude 工程入門指南

這不是單純的一個教學網站。**這個 GitHub Repo 本身就是教材。**

主要只有兩個入口：

- 🌐 完整教學網站：<https://k1everwann.github.io/codex-starter-guide/>
- 🐙 GitHub Repo：<https://github.com/k1everwann/codex-starter-guide>

教學網站從 AI Coding、Git / GitHub、Python、資料 / API、連接器一路往下，途中可以直接執行 Python / SQLite，後半段再接 Gmail + Google Drive 完整實作。

## 建議怎麼學

1. 先開主教學網站，分清楚模型（Model）、執行者（Agent）、推理強度（Reasoning）與工作模式（Work Mode）。
2. 做一次 10 分鐘 Git 練習：分支（Branch）→ 提交（Commit）→ Pull Request（PR）→ 合併（Merge）。
3. 在 Python / SQL Playground 改一行程式，按 Run 看結果。
4. 回到這個 Repo，看 `index.html`、`ai-guide.html`、`styles.css`、`script.js`，對照實際畫面。
5. 看提交紀錄（Commits），理解 Git 真正在保存的是什麼。
6. 回到主教學網站的實作章節，從 Google Cloud 專案、API、OAuth 一路做到 Apps Script Web App。
7. 最後把自己的旅遊網站照同樣方式整理、擴充。

👉 更完整的專案導讀請看：[PROJECT-ARCHITECTURE.md](./PROJECT-ARCHITECTURE.md)

---

## 實作：真的做一個 Gmail + Google Drive 網站

主教學網站往下滑到實作章節，就會直接依序看到：

```text
建立 Standard Google Cloud 專案
        ↓
啟用 Gmail API + Drive API
        ↓
Google Auth / OAuth 授權
        ↓
Apps Script 綁 Project Number
        ↓
前端（Frontend）+ 後端（Backend）
        ↓
GmailApp / DriveApp
        ↓
部署（Deploy）Web App
        ↓
自己的 Travel Workspace Dashboard
```

實作會用到：

- 完整步驟：[labs/google-workspace-webapp/README.md](./labs/google-workspace-webapp/README.md)
- 後端（Backend）：[Code.gs](./labs/google-workspace-webapp/Code.gs)
- 前端（Frontend）：[Index.html](./labs/google-workspace-webapp/Index.html)

做完後會碰到：前端、後端、Google Cloud 專案、API 啟用、OAuth 授權、權限、Gmail、Drive、錯誤處理、部署。

---

## 這個專案的結構

```text
codex-starter-guide/
├─ index.html                    ← 主教學網站骨架
├─ ai-guide.html                 ← AI 模型 / 推理強度 / 工作模式導讀
├─ git-practice.html             ← Git / PR 小實作
├─ playgrounds.html              ← Python / SQL 互動練習內容
├─ lab-content.html              ← 主頁內載入的完整 Google Workspace 實作
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
│     ├─ README.md               ← Google Cloud → Gmail / Drive 完整步驟
│     ├─ Code.gs                 ← Apps Script 後端
│     └─ Index.html              ← Apps Script 前端
├─ .gitignore                    ← 不要進 Git 的檔案
├─ .env.example                  ← 機密資訊（Secret）/ 環境變數範例
└─ .nojekyll                     ← GitHub Pages 靜態站設定
```

最先記住：

```text
HTML          = 內容與結構
CSS           = 外觀
JavaScript    = 互動 / 組合頁面片段
README        = 給人看的入口
AGENTS        = 給 Codex 的 SOP
CLAUDE        = 給 Claude Code 的 SOP
Git           = 保存版本
GitHub        = 放 Repo 與協作
Pages         = 把 main 發布成網站
Google Cloud  = API / OAuth / Cloud 設定所在的位置
```

---

## 這個網站會教什麼

- 模型（Model）/ 執行者（Agent）/ 推理強度（Reasoning）/ 工作模式（Work Mode）的差別
- Claude Code 的 Haiku / Sonnet / Opus / Fable 5 定位
- GPT-5.6 的 Luna / Terra / Sol / Sol Pro 與推理強度概念
- 規劃模式（Plan Mode）與執行模式（Execute / Default）的概念
- Git 與 GitHub
- GitHub Pages
- Notion、README.md、AGENTS.md、CLAUDE.md 的分工
- 工作單（Issue）、分支（Branch）、Pull Request（PR）
- 測試（Test）、機密資訊（Secret）、部署（Deploy）、日誌（Log）
- Python：只學到看得懂 AI 寫的程式
- 瀏覽器內可直接執行的 Python Playground
- SQLite / SQL Playground 與 API 概念
- Gmail / Google Drive / Notion 連接器（Connector）與 MCP
- Google Cloud 專案、Google Workspace API、OAuth 的完整實作流程

## Python 為什麼只教概念？

現在 AI 可以幫你寫大量程式，所以第一階段不需要把時間花在背語法。

至少要能看懂：變數、串列（List）/ 字典（Dictionary）、`if`、`for`、函式（function）、匯入（import）、錯誤追蹤（Traceback）。

目標是：**AI 負責寫，你負責看懂大意、判斷方向、驗證結果。**

---

## 這個 Repo 怎麼變成網站？

```text
你 / Codex / Claude
        ↓
修改程式
        ↓
提交（Commit）
        ↓
GitHub main branch
        ↓
GitHub Pages
        ↓
https://k1everwann.github.io/codex-starter-guide/
```

GitHub Pages 不是另一份網站；它就是這個 Repo 的靜態檔案發布結果。

---

## 直接拿這個 Repo 練規劃模式（Plan Mode）

```text
請先不要修改程式。

閱讀這個專案：
https://github.com/k1everwann/codex-starter-guide

請告訴我：
1. 專案入口是哪個檔案？
2. 主頁如何載入 AI 導讀、Git 練習、Playground 與 Google Workspace 實作？
3. README、AGENTS.md、CLAUDE.md 的讀者有何不同？
4. GitHub Pages 如何把這個 Repo 變成網站？
5. 如果我要新增一個章節，你預計改哪些檔案？
```

重點不是讓 AI 馬上改，而是練習：**先讀現況 → 分析 → 提出計畫 → 再執行。**