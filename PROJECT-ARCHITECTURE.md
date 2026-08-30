# 專案架構導讀

這份文件直接用這個 Repo 理解：**一個最小但完整的教學網站專案，到底有哪些東西。**

公開網站：<https://k1everwann.github.io/codex-starter-guide/>

Repo：<https://github.com/k1everwann/codex-starter-guide>

---

## 1. 先看整體

```text
codex-starter-guide/
├─ index.html                    ← 主教學網站
├─ lab-content.html              ← 同一頁載入的完整 Hands-on Lab
├─ google-workspace-lab.html     ← 舊網址相容轉址
├─ styles.css                    ← 外觀、排版、RWD
├─ script.js                     ← 載入 Lab + 左側導覽互動
├─ README.md                     ← 給第一次進 Repo 的人看
├─ PROJECT-ARCHITECTURE.md       ← 你正在看的專案導讀
├─ AGENTS.md                     ← Codex 的專案規則
├─ CLAUDE.md                     ← Claude Code 的專案規則
├─ labs/
│  └─ google-workspace-webapp/
│     ├─ README.md               ← GCP → Gmail / Drive 完整實作步驟
│     ├─ Code.gs                 ← Apps Script Backend
│     └─ Index.html              ← Apps Script Frontend
├─ .gitignore                    ← 哪些檔案不要進 Git
├─ .env.example                  ← 環境變數 / Secret 範例
└─ .nojekyll                     ← GitHub Pages 靜態站設定
```

先記住最重要的分工：

```text
index.html          = 主頁內容與章節骨架
lab-content.html    = Hands-on Lab 的詳細步驟
styles.css          = 外觀
script.js           = 載入 Lab 與導覽互動
README              = 給人看的入口
AGENTS              = 給 Codex 的 SOP
CLAUDE              = 給 Claude Code 的 SOP
Git                 = 保存每次修改
GitHub              = 存放 Repo 與版本歷史
Pages               = 把 main 的靜態網站發布到 Internet
```

---

## 2. 為什麼 Lab 拆成 `lab-content.html`，但讀者只看到一個網站？

這裡刻意示範一個很常見的概念：**檔案可以拆開維護，使用者不一定要看到多個頁面。**

```text
index.html
   │
   │ script.js 載入
   ▼
lab-content.html
   │
   ▼
同一個主頁往下繼續閱讀
```

所以：

- `index.html` 負責整體教材與 Hands-on 入口。
- `lab-content.html` 放 09.1～09.10 的詳細實作。
- `script.js` 把 Lab 插到主頁 Hands-on 區塊後面。
- `google-workspace-lab.html` 只保留給舊網址使用，會導回主網站。

這樣既不需要維護兩套教學網站，也不必把一個 HTML 檔塞得非常巨大。

---

## 3. 這個網站怎麼從程式碼變成公開網址？

```text
你 / Codex / Claude
        │
        │ 修改檔案
        ▼
      Git
   建立 commit
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

## 4. 從 GitHub 頁面開始學

### 第一步：看 `index.html`

<https://github.com/k1everwann/codex-starter-guide/blob/main/index.html>

不用看懂所有 HTML。先找網站上真的看得到的一句文字或一個章節標題，你會發現：**瀏覽器顯示的內容，本來就存在程式碼裡。**

### 第二步：看 `lab-content.html`

<https://github.com/k1everwann/codex-starter-guide/blob/main/lab-content.html>

這裡放的是主網站後半段的完整 Gmail / Drive Hands-on Lab。你在公開網站看到它像同一頁，但 Repo 裡其實已經把內容拆檔。

### 第三步：看 `styles.css`

<https://github.com/k1everwann/codex-starter-guide/blob/main/styles.css>

可以搜尋：

```text
.sidebar
.content
section
```

HTML 描述內容與區塊；真正的寬度、留白、字體、邊線與手機版配置由 CSS 決定。

### 第四步：看 `script.js`

<https://github.com/k1everwann/codex-starter-guide/blob/main/script.js>

目前 JavaScript 主要做兩件事：

1. 用 `fetch('./lab-content.html')` 把完整 Lab 載入主頁。
2. 根據閱讀位置高亮左側導覽。

這是一個很好的例子：**JavaScript 不一定要很複雜，但可以負責把不同檔案組成一個完整體驗。**

---

## 5. README、AGENTS.md、CLAUDE.md 為什麼都要存在？

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

## 6. Git 真正要學的是「差異」，不是指令

打開 Commit 歷史：
<https://github.com/k1everwann/codex-starter-guide/commits/main/>

點任一個 commit，你會看到：

```text
綠色 +  = 這次新增
紅色 -  = 這次刪除
```

這就是 `diff`。工程師真正關心的通常不是整份檔案，而是：**這次修改到底改了什麼？**

所以 Codex / Claude 改完後，養成看 diff 的習慣，比先背大量 Git 指令重要。

---

## 7. Branch 和 Pull Request 可以怎麼想？

```text
main
= 現在的正式版本

feature/new-section
= 另外開的施工區

Pull Request
= 把施工區的修改拿來比較與檢查

Merge
= 確認沒問題後放進 main
```

```text
main ───────────────────────●───
       \
        ●──●──●  feature
               \
                Pull Request
                    │
                 Review
                    │
                  Merge
```

---

## 8. 可以直接拿這個 Repo 問 AI

```text
請先不要修改程式。

閱讀這個專案：
https://github.com/k1everwann/codex-starter-guide

請告訴我：
1. 專案入口是哪個檔案？
2. index.html 與 lab-content.html 為什麼分開？
3. styles.css 與 script.js 分別負責什麼？
4. README.md、AGENTS.md、CLAUDE.md 的用途有何不同？
5. GitHub Pages 如何把這個 Repo 變成網站？
6. 如果我要新增一個 Hands-on 步驟，你預計修改哪些檔案？
```

重點是練習：**讀現況 → 分析 → 規劃 → 再執行。**

---

## 9. 之後自己的旅遊網站也可以長這樣

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
Frontend
   │
   ▼
Backend / API
   │
   ├─ Gmail / Drive / Calendar
   │
   ▼
SQLite / Database
```

不要為了「像工程師」而一開始堆一堆技術。**讓需求逼出下一個工具**，學得最快。