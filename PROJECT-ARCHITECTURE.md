# 專案架構導讀

這份文件直接用這個 Repo 理解：**一個最小但完整的 Web 專案，到底有哪些東西。**

公開網站：<https://k1everwann.github.io/codex-starter-guide/>

Repo：<https://github.com/k1everwann/codex-starter-guide>

---

## 1. 先看整體

```text
codex-starter-guide/
├─ index.html          ← 網站內容與結構
├─ styles.css          ← 外觀、排版、RWD
├─ script.js           ← 少量互動
├─ README.md           ← 給第一次進 Repo 的人看
├─ PROJECT-ARCHITECTURE.md
│                      ← 你正在看的專案導讀
├─ AGENTS.md           ← Codex 的專案規則
├─ CLAUDE.md           ← Claude Code 的專案規則
├─ .gitignore          ← 哪些檔案不要進 Git
├─ .env.example        ← 環境變數 / Secret 的範例
└─ .nojekyll           ← GitHub Pages 的靜態站設定
```

先記住最重要的分工：

```text
HTML        = 內容與結構
CSS         = 外觀
JavaScript  = 互動
README      = 給人看的入口
AGENTS      = 給 Codex 的 SOP
CLAUDE      = 給 Claude Code 的 SOP
Git         = 保存每次修改
GitHub      = 存放 Repo 與版本歷史
Pages       = 把 main 的靜態網站發布到 Internet
```

---

## 2. 這個網站怎麼從程式碼變成公開網址？

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

## 3. 從 GitHub 頁面開始學

### 第一步：看 `index.html`

打開：
<https://github.com/k1everwann/codex-starter-guide/blob/main/index.html>

不用看懂所有 HTML。先找網站上真的看得到的一句文字或一個章節標題，你會發現：**瀏覽器顯示的內容，本來就存在程式碼裡。**

### 第二步：看 `styles.css`

打開：
<https://github.com/k1everwann/codex-starter-guide/blob/main/styles.css>

可以搜尋：

```text
.sidebar
.content
section
```

你會看到 HTML 只描述「這是什麼區塊」，真正的寬度、留白、字體大小、邊線與手機版配置由 CSS 決定。

這個版本刻意採用簡約文件站版型：桌機左側目錄、右側窄內容欄，幾乎沒有陰影或大型 Hero。

### 第三步：看 `script.js`

打開：
<https://github.com/k1everwann/codex-starter-guide/blob/main/script.js>

這個網站的 JavaScript 很少，只負責根據目前閱讀的位置，高亮左側導覽。這也是一個好例子：**不是每個網站都需要很多 JavaScript。**

---

## 4. README、AGENTS.md、CLAUDE.md 為什麼都要存在？

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

## 5. Git 真正要學的是「差異」，不是指令

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

## 6. Branch 和 Pull Request 可以怎麼想？

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

## 7. 可以直接拿這個 Repo 問 AI

```text
請先不要修改程式。

閱讀這個專案：
https://github.com/k1everwann/codex-starter-guide

請告訴我：
1. 專案入口是哪個檔案？
2. HTML / CSS / JavaScript 各自負責什麼？
3. README.md、AGENTS.md、CLAUDE.md 的用途有何不同？
4. GitHub Pages 如何把這個 Repo 變成網站？
5. 如果我要新增一個章節，你預計修改哪些檔案？
```

重點是練習：**讀現況 → 分析 → 規劃 → 再執行。**

---

## 8. 之後自己的旅遊網站也可以長這樣

```text
my-travel-site/
├─ index.html
├─ styles.css
├─ script.js
├─ README.md
├─ AGENTS.md
└─ CLAUDE.md
```

如果未來真的有很多旅行資料，再自然演進成：

```text
Frontend
   │
   ▼
Backend / API
   │
   ▼
SQLite / Database
```

不要為了「像工程師」而一開始堆一堆技術。**讓需求逼出下一個工具**，學得最快。
