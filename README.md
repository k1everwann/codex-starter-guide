# Codex / Claude 工程入門指南

這不是單純的一個教學網站。**這個 GitHub Repo 本身就是教材。**

你可以同時看兩邊：

- 🌐 公開教學網站：<https://k1everwann.github.io/codex-starter-guide/>
- 🐙 GitHub Repo：<https://github.com/k1everwann/codex-starter-guide>

網站教你「概念」，Repo 讓你看到「真正的專案長什麼樣」。

## 建議怎麼學

1. 先開教學網站，看 Git / GitHub / AI Coding 的比喻。
2. 回到這個 Repo，打開 `index.html`、`styles.css`、`script.js`，對照網站畫面。
3. 看 `README.md`、`AGENTS.md`、`CLAUDE.md`，理解「給人看的文件」和「給 AI 的規則」差在哪。
4. 打開 Commits，看每次修改的 diff，理解 Git 真正在保存的是什麼。
5. 再把自己的旅遊網站照同樣方式整理成一個 Repo。

👉 更完整的專案導讀請看：[PROJECT-ARCHITECTURE.md](./PROJECT-ARCHITECTURE.md)

---

## 這個專案的結構

```text
codex-starter-guide/
├─ index.html          ← 網站內容與骨架
├─ styles.css          ← 外觀、排版、RWD
├─ script.js           ← 網頁互動
├─ README.md           ← Repo 的入口
├─ PROJECT-ARCHITECTURE.md
│                      ← 專案架構導讀
├─ AGENTS.md           ← Codex 的專案規則
├─ CLAUDE.md           ← Claude Code 的專案規則
├─ .gitignore          ← 不要進 Git 的檔案
├─ .env.example        ← Secret / 環境變數範例
└─ .nojekyll           ← GitHub Pages 靜態站設定
```

最先記住：

```text
HTML        = 內容與結構
CSS         = 外觀
JavaScript  = 互動
README      = 給人看的入口
AGENTS      = 給 Codex 的 SOP
CLAUDE      = 給 Claude Code 的 SOP
Git         = 保存版本
GitHub      = 放 Repo 與協作
Pages       = 把 main 發布成網站
```

---

## 這個網站會教什麼

- Model / Agent / Mode 的差別
- Claude Code Plan Mode 與 Codex Plan / Default 的概念
- Git 與 GitHub
- GitHub Pages
- Notion、README.md、AGENTS.md、CLAUDE.md 的分工
- Issue、Branch、Pull Request
- Test、Secret、Deploy、Log
- Python：只學到看得懂 AI 寫的程式
- SQLite、API 的概念
- Gmail / Google Drive / Notion Connector 與 MCP

## Python 為什麼只教概念？

現在 AI 可以幫你寫大量程式，所以第一階段不需要把時間花在背語法。

至少要能看懂：

- 變數
- List / Dictionary
- `if`
- `for`
- function
- import
- Error / Traceback

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

所以公開網站不是另外維護的一份內容；它就是這個 Repo 的靜態檔案發布結果。

---

## 直接拿這個 Repo 練 AI Plan Mode

把這段丟給 Codex / Claude：

```text
請先不要修改程式。

閱讀這個專案：
https://github.com/k1everwann/codex-starter-guide

請告訴我：
1. 專案入口是哪個檔案？
2. HTML / CSS / JavaScript 各負責什麼？
3. README、AGENTS.md、CLAUDE.md 的讀者有何不同？
4. GitHub Pages 如何把這個 Repo 變成網站？
5. 如果我要新增一個章節，你預計改哪些檔案？
```

重點不是讓 AI 馬上改，而是練習：**先讀現況 → 分析 → 提出計畫 → 再執行。**
