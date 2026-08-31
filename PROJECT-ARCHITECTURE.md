# 專案架構導讀

這份文件直接用這個 Repo 理解：**一個最小但完整的教學網站專案，到底有哪些東西。**

公開網站：<https://k1everwann.github.io/codex-starter-guide/>

Repo：<https://github.com/k1everwann/codex-starter-guide>

---

## 1. 先看整體

```text
codex-starter-guide/
├─ index.html                    ← 主教學網站骨架
├─ ai-guide.html                 ← AI 模型 / 推理強度 / 工作模式
├─ git-practice.html             ← Git / PR 小實作
├─ playgrounds.html              ← Python / SQL 互動練習內容
├─ lab-content.html              ← 同一頁載入的 Google Workspace 完整實作
├─ final-challenge.html          ← 最後挑戰
├─ google-workspace-lab.html     ← 舊網址相容轉址
├─ styles.css                    ← 主網站外觀、排版、RWD
├─ playgrounds.css               ← 互動練習區樣式
├─ script.js                     ← 組合頁面片段 + 左側導覽互動
├─ playgrounds.js                ← 在瀏覽器執行 Python / SQLite
├─ README.md                     ← 給第一次進 Repo 的人看
├─ PROJECT-ARCHITECTURE.md       ← 你正在看的專案導讀
├─ AGENTS.md                     ← Codex 的專案規則
├─ CLAUDE.md                     ← Claude Code 的專案規則
├─ labs/
│  └─ google-workspace-webapp/
│     ├─ README.md               ← Google Cloud → Gmail / Drive 完整實作步驟
│     ├─ Code.gs                 ← Apps Script 後端
│     └─ Index.html              ← Apps Script 前端
├─ .gitignore                    ← 哪些檔案不要進 Git
├─ .env.example                  ← 環境變數 / 機密資訊（Secret）範例
└─ .nojekyll                     ← GitHub Pages 靜態站設定
```

先記住最重要的分工：

```text
index.html          = 主頁骨架
內容片段             = AI 導讀 / Git 練習 / Playground / Google Workspace 實作 / 最後挑戰
styles.css          = 主站外觀
playgrounds.css     = 可編輯練習區外觀
script.js           = 把內容片段組回同一頁
playgrounds.js      = 讓 Python / SQLite 在瀏覽器執行
README              = 給人看的入口
AGENTS              = 給 Codex 的 SOP
CLAUDE              = 給 Claude Code 的 SOP
Git                 = 保存每次修改
GitHub              = 存放 Repo 與版本歷史
Pages               = 把 main 的靜態網站發布到 Internet
```

---

## 2. 為什麼內容拆成多個 HTML，但讀者只看到一個網站？

這裡刻意示範一個常見概念：**程式可以拆檔維護，使用者不一定要看到多個頁面。**

```text
index.html
   │
   │ script.js 載入
   ├────────► ai-guide.html
   ├────────► git-practice.html
   ├────────► playgrounds.html
   ├────────► lab-content.html
   └────────► final-challenge.html
                   │
                   ▼
            同一個主頁往下閱讀
```

所以：

- `index.html` 負責主要章節與整體順序。
- `ai-guide.html` 放模型（Model）、推理強度（Reasoning）與工作模式（Work Mode）。
- `git-practice.html` 放 10 分鐘 Git / PR 實作。
- `playgrounds.html` 放 Python / SQL 的可編輯介面。
- `lab-content.html` 放 09.1～09.10 的 Google Workspace 詳細實作。
- `final-challenge.html` 放最後的作品檢查清單。
- `script.js` 把以上內容插回主頁正確位置。
- `google-workspace-lab.html` 只保留舊網址相容，會導回主網站。

這樣既不需要維護多套教學網站，也不必把一個 HTML 檔塞得非常巨大。

---

## 3. 互動式 Python / SQL 為什麼 GitHub Pages 也能做？

GitHub Pages 本身不能執行 Python server 或 SQLite server，但瀏覽器可以執行 WebAssembly。

這個專案因此把練習做成：

```text
瀏覽器（Browser）
   ├─ Pyodide → Python
   └─ sql.js   → SQLite
```

`playgrounds.js` 只在第一次按 Run 時載入執行環境，避免一開網站就下載不必要的資源。

練習資料統一使用：

```text
Hokkaido   7 days   42000
Tokyo      5 days   28000
Chiang Mai 4 days   18000
```

這讓 Python 與 SQL 可以用同一份情境理解條件、篩選與資料表。

---

## 4. 這個網站怎麼從程式碼變成公開網址？

```text
你 / Codex / Claude
        │
        │ 修改檔案
        ▼
      Git
   建立提交（Commit）
        │
        ▼
 GitHub Repository
   main branch
        │
        ▼
   GitHub Pages
        │
        ▼
公開網站
https://k1everwann.github.io/codex-starter-guide/
```

GitHub Pages 不是另一份網站；它發布的來源就是這個 Repo 裡的靜態檔案。

---

## 5. 從 GitHub 頁面開始學

### 第一步：看 `index.html`

<https://github.com/k1everwann/codex-starter-guide/blob/main/index.html>

不用看懂所有 HTML。先找網站上真的看得到的一句文字或一個章節標題，你會發現：**瀏覽器顯示的內容，本來就存在程式碼裡。**

### 第二步：看 `script.js`

<https://github.com/k1everwann/codex-starter-guide/blob/main/script.js>

目前 JavaScript 會：

1. 載入 AI 模型與模式導讀。
2. 載入 Git 小實作。
3. 載入 Python / SQL Playground。
4. 載入完整 Google Workspace 實作。
5. 載入最後挑戰。
6. 根據閱讀位置高亮左側導覽。

這是一個很好的例子：**JavaScript 不一定要很複雜，但可以負責把不同檔案組成一個完整體驗。**

### 第三步：看 `playgrounds.js`

<https://github.com/k1everwann/codex-starter-guide/blob/main/playgrounds.js>

先不用看懂全部。只要知道它做兩件事：

```text
Run Python
→ 把 textarea 裡的文字交給 Pyodide
→ 顯示執行結果（Output）

Run SQL
→ 把 textarea 裡的 SQL 交給 sql.js
→ 顯示查詢結果（Result）
```

### 第四步：看 `styles.css`

<https://github.com/k1everwann/codex-starter-guide/blob/main/styles.css>

可以搜尋：

```text
.sidebar
.content
.split
.prompt-grid
```

HTML 描述內容與區塊；真正的寬度、留白、字體、雙欄等高與手機版配置由 CSS 決定。

---

## 6. README、AGENTS.md、CLAUDE.md 為什麼都要存在？

| 檔案 | 主要讀者 | 回答的問題 |
|---|---|---|
| `README.md` | 人 | 這是什麼專案？怎麼看？ |
| `PROJECT-ARCHITECTURE.md` | 開發者 | 這個專案有哪些部分？ |
| `AGENTS.md` | Codex | 修改這個專案要遵守什麼規則？ |
| `CLAUDE.md` | Claude Code | Claude 在這個專案裡怎麼工作？ |

可以把它想成：

```text
README.md
= 公司門口的介紹

PROJECT-ARCHITECTURE.md
= 建築平面圖

AGENTS.md / CLAUDE.md
= 內部 SOP
```

---

## 7. Git 真正要學的是「差異」，不是指令

打開提交紀錄（Commits）：
<https://github.com/k1everwann/codex-starter-guide/commits/main/>

點任一個提交（Commit），你會看到：

```text
綠色 +  = 這次新增
紅色 -  = 這次刪除
```

這就是差異（Diff）。工程師真正關心的通常不是整份檔案，而是：**這次修改到底改了什麼？**

所以 Codex / Claude 改完後，養成看差異的習慣，比先背大量 Git 指令重要。

---

## 8. 分支（Branch）和 Pull Request（PR）可以怎麼想？

```text
main
= 現在的正式版本

feature/new-section
= 另外開的施工區，也就是分支（Branch）

Pull Request（PR）
= 把施工區的修改拿來比較與檢查

合併（Merge）
= 確認沒問題後放進 main
```

```text
main ───────────────────────●───
       \
        ●──●──●  feature
               \
                Pull Request
                    │
                檢查（Review）
                    │
                合併（Merge）
```

---

## 9. 可以直接拿這個 Repo 問 AI

```text
請先不要修改程式。

閱讀這個專案：
https://github.com/k1everwann/codex-starter-guide

請告訴我：
1. 專案入口是哪個檔案？
2. index.html 為什麼沒有塞進全部教學內容？
3. script.js 會載入哪些內容片段？
4. playgrounds.js 為什麼能在瀏覽器執行 Python / SQLite？
5. README.md、AGENTS.md、CLAUDE.md 的用途有何不同？
6. 如果我要新增一個實作步驟，你預計修改哪些檔案？
```

重點是練習：**讀現況 → 分析 → 規劃 → 再執行。**

---

## 10. 之後自己的旅遊網站也可以長這樣

一開始：

```text
my-travel-site/
├─ index.html
├─ styles.css
├─ script.js
├─ README.md
├─ AGENTS.md
└─ CLAUDE.md
```

資料與功能變多後，可以自然演進成：

```text
前端（Frontend）
   │
   ▼
後端（Backend）/ API
   │
   ├─ Gmail / Drive / Calendar
   │
   ▼
SQLite / 資料庫（Database）
```

不要為了「像工程師」而一開始堆一堆技術。**讓需求逼出下一個工具**，學得最快。