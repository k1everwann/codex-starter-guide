# Hands-on Lab：做一個 Gmail + Google Drive 網站

這不是只看的範例。照著做完，你會得到一個真的能打開的 **Travel Workspace Dashboard**：

```text
Travel Workspace Dashboard
├─ Gmail：顯示最近一年旅遊相關郵件
└─ Google Drive：輸入關鍵字搜尋自己的檔案
```

架構：

```text
Browser
   │
   │ google.script.run
   ▼
Google Apps Script
   ├─ GmailApp ──────► Gmail
   └─ DriveApp ──────► Google Drive

        │
        └── 關聯到 Standard Google Cloud Project
              ├─ Gmail API
              ├─ Google Drive API
              └─ Google Auth / OAuth 設定
```

> 這個 Lab 故意不用 GitHub Pages 直接讀 Gmail。Gmail / Drive 涉及 OAuth 與帳號權限，不能把 Token 或 Secret 塞進公開前端。Apps Script 在這裡扮演 Backend。

---

# 你會學到什麼？

做完後，不要求你能默寫程式，但應該能回答：

- GCP Project 是什麼？
- Project ID 和 Project Number 有什麼差別？
- 為什麼要 Enable API？
- OAuth / Consent Screen 在保護什麼？
- Frontend 和 Backend 差在哪？
- `doGet()` 是做什麼的？
- `google.script.run` 為什麼可以從網頁呼叫 Backend？
- Gmail / Drive 為什麼第一次執行會要求授權？
- 「誰能開網站」和「程式用誰的權限讀資料」為什麼不是同一件事？
- Error 發生時要先查 Browser、Apps Script 還是 Google API？

---

# Part 1：建立自己的 GCP Project

## Step 1 — 建立 Google Cloud Project

打開 Google Cloud Console：

<https://console.cloud.google.com/>

在上方 Project selector 選：

```text
New Project
```

教學範例名稱可以用：

```text
Travel Workspace Lab
```

建立後，先找到並記住三個東西：

```text
Project name
Project ID
Project number
```

### 三者差在哪？

```text
Project name
= 給人看的名字，可以改

Project ID
= Google Cloud 裡的唯一識別字串

Project number
= 純數字 ID
= 等一下 Apps Script 綁 GCP 專案時會用到
```

> Apps Script 的「Change project」要貼的是 **Project Number**，不是 Project ID。

---

# Part 2：啟用 Gmail API 與 Google Drive API

## Step 2 — Enable Gmail API

確認 Cloud Console 上方目前選到剛建立的 Project。

進入：

```text
APIs & Services
→ Library
```

搜尋：

```text
Gmail API
```

點進去後按：

```text
Enable
```

---

## Step 3 — Enable Google Drive API

回到 API Library，搜尋：

```text
Google Drive API
```

按：

```text
Enable
```

完成後，可以到：

```text
APIs & Services
→ Enabled APIs & services
```

確認至少看得到：

```text
Gmail API
Google Drive API
```

### 為什麼要 Enable API？

可以把 Google Cloud Project 想成一間公司，而 API 是公司允許使用的外部服務。

```text
GCP Project
   │
   ├─ Gmail API       OFF / ON
   ├─ Drive API       OFF / ON
   ├─ Calendar API    OFF / ON
   └─ ...
```

你不是「有 Google 帳號就自動能讓任何程式讀 Gmail」。

要先明確告訴 Google：

> 這個 Cloud Project 預計會使用 Gmail / Drive 這些服務。

---

# Part 3：設定 Google Auth / OAuth

## Step 4 — 開始設定 Google Auth Platform

在 Cloud Console 找：

```text
Google Auth Platform
```

如果尚未設定，按：

```text
Get Started
```

### Branding

填入：

```text
App name: Travel Workspace Dashboard
User support email: 你的 Google 帳號
Contact email: 你的 Email
```

這些資訊會出現在使用者授權畫面。

---

## Step 5 — Audience

如果是 Google Workspace 公司 / 學校帳號，而且只給組織內使用，可能可以選：

```text
Internal
```

如果是一般個人 Gmail 帳號，通常使用：

```text
External
```

在開發階段先維持 Testing。

如果是 External，將自己的 Google 帳號加入：

```text
Audience
→ Test users
→ Add users
```

這樣你自己才是被允許測試 OAuth 的使用者。

---

## Step 6 — Data Access / Scopes 的概念

進入：

```text
Google Auth Platform
→ Data Access
```

Scope 可以理解成：

> 「你不是只問使用者：要不要授權？而是要說清楚你到底想拿哪一種權限。」

例如概念上可能有：

```text
只讀 Gmail
讀取 Drive
建立 Drive 檔案
寄 Gmail
```

權限越大，風險越高。

這個教學的原則是：

```text
能 Read 就不要先要 Write
能只拿必要資料就不要拿整個帳號權限
```

### 這個 Lab 需要自己建立 OAuth Client ID 嗎？

**不用。**

這一版使用 Apps Script 的 built-in services：

```javascript
GmailApp
DriveApp
```

Apps Script 會處理這些服務需要的 OAuth 流程。

如果未來改成：

```text
自己的 Node.js / Python Backend
直接呼叫 Gmail REST API / Drive REST API
```

那時才會進一步建立 OAuth Client ID / Client Secret。

---

# Part 4：建立 Apps Script 專案

## Step 7 — 建立 Apps Script

打開：

<https://script.google.com/>

建立：

```text
New project
```

教學名稱：

```text
Travel Workspace Dashboard
```

Apps Script 預設會有：

```text
Code.gs
```

---

# Part 5：把 Apps Script 綁到剛才的 GCP Project

## Step 8 — 找到 GCP Project Number

回 Google Cloud Console：

```text
IAM & Admin
→ Settings
```

找到：

```text
Project number
```

複製那串純數字。

---

## Step 9 — Change project

回 Apps Script。

左側：

```text
Project Settings
```

找到：

```text
Google Cloud Platform (GCP) Project
```

按：

```text
Change project
```

貼上剛才的：

```text
Project number
```

按：

```text
Set project
```

現在你的關係變成：

```text
Apps Script Project
        │
        ▼
Standard GCP Project
        │
        ├─ Gmail API
        ├─ Drive API
        └─ Google Auth settings
```

### Default Project vs Standard Project

Apps Script 原本其實會自動建立一個 Default Cloud Project。

簡單 script 通常不需要理它。

這個 Lab 故意改成 Standard Project，是因為你要真正看懂：

```text
API
OAuth
Cloud Logs
Project settings
```

這些東西在完整應用程式裡放在哪一層。

> 切換到 Standard Project 後不要把它當成隨便測試的開關；Apps Script 官方也建議越早決定越好，因為之後切換 Project 可能需要重新授權與重新啟用 API。

---

# Part 6：加入 Backend

## Step 10 — 貼上 `Code.gs`

本 Repo 已經準備好：

[Code.gs](./Code.gs)

把 Apps Script 原本的內容換成這份。

先只看懂三個 function：

```javascript
function doGet() { ... }
```

意思：

> Browser 開啟 Web App 時，把 `Index.html` 回傳給它。

```javascript
function getTravelEmails() { ... }
```

意思：

> Backend 去 Gmail 找旅遊相關信件。

```javascript
function searchDriveFiles(keyword) { ... }
```

意思：

> Backend 去自己的 Drive 搜尋檔案。

---

# Part 7：加入 Frontend

## Step 11 — 建立 `Index.html`

Apps Script 左側：

```text
＋
→ HTML
```

檔名：

```text
Index
```

貼入：

[Index.html](./Index.html)

現在專案：

```text
Travel Workspace Dashboard/
├─ Code.gs       Backend
└─ Index.html    Frontend
```

---

# Part 8：理解 Frontend 如何叫 Backend

在 `Index.html` 找：

```javascript
google.script.run
  .withSuccessHandler(renderEmails)
  .withFailureHandler(...)
  .getTravelEmails();
```

完整流程：

```text
使用者按按鈕
     │
     ▼
Index.html
     │
     │ google.script.run
     ▼
Code.gs
     │
     ▼
GmailApp
     │
     ▼
Gmail
```

Browser **沒有直接拿 Gmail 權限**。

它只是請 Apps Script Backend 做事。

這是非常重要的 Web 開發概念。

---

# Part 9：第一次授權

## Step 12 — 執行 `testAccess()`

Apps Script 上方 function 下拉選單選：

```text
testAccess
```

按：

```text
Run
```

第一次執行會出現 Google 授權流程。

你現在應該可以理解那個畫面不是「煩人的警告」，而是在做：

```text
Authentication
你是誰？

Authorization
這個 App 可以拿哪些權限？
```

檢查權限後再 Allow。

如果 Execution log 沒有紅色錯誤，代表 Backend 可以存取 Gmail / Drive。

---

# Part 10：部署成真正的網站

## Step 13 — Deploy Web App

右上角：

```text
Deploy
→ New deployment
→ Web app
```

### Execute as

這是整個 Lab 最重要的權限概念之一。

如果只是自己的私人 Dashboard，可以讓 App 以自己的身分執行，並把存取範圍限制給自己。

如果未來要讓不同使用者登入後，各自讀自己的 Gmail / Drive，就要用「目前開啟 Web App 的使用者」身分執行的模式。

所以：

```text
誰能開網站
≠
Backend 用誰的 Google 權限執行
```

### Who has access

練習階段：

```text
只開給自己
```

不要把一個「以你的 Gmail 權限執行」的 Web App 隨便公開給所有人。

Deploy 後會取得：

```text
https://script.google.com/.../exec
```

這就是你的第一個 Google Workspace Web App。

---

# Part 11：完成 Google Drive 功能

## Step 14 — 搜尋 Drive

打開 Web App。

輸入一個你確定存在的檔名：

```text
booking
```

或：

```text
東京
```

按：

```text
搜尋 Drive
```

成功時，會看到最多 10 筆：

```text
檔名
MIME type
更新日期
Drive Link
```

Backend 核心：

```javascript
DriveApp.searchFiles(...)
```

再把 Google 的 File object 整理成普通資料：

```javascript
{
  name,
  url,
  mimeType,
  updated
}
```

這一步是在學：

```text
Google object
→ Backend 整理
→ Frontend Data
```

---

# Part 12：完成 Gmail 功能

## Step 15 — 載入旅遊郵件

按：

```text
載入最近旅遊郵件
```

Backend 使用 Gmail query：

```text
newer_than:365d {subject:flight subject:hotel subject:booking subject:reservation subject:ticket}
```

核心：

```javascript
GmailApp.search(query, 0, 10)
```

為了隱私，範例**不把整封信內容傳到 Browser**，只回：

```text
Subject
From
Date
```

如果你的旅遊信是中文，可以自己改成：

```text
newer_than:365d {subject:訂房 subject:機票 subject:預約}
```

---

# Part 13：Debug，不要只問 AI「怎麼壞了」

## Browser 層

開 DevTools，看：

```text
Console
```

問題例如：

```text
按鈕沒有反應
JavaScript error
DOM 找不到
```

---

## Apps Script 層

看：

```text
Executions
Execution log
```

問題例如：

```text
程式 exception
Gmail query 出錯
Drive query 出錯
```

---

## Google Cloud / OAuth 層

檢查：

```text
API 是否 Enabled
Apps Script 是否綁對 Project Number
自己是否在 Test users
OAuth Scope / Permission 是否允許
```

可以用這個 prompt 問 Codex / Claude：

```text
先不要修改程式。

Expected:
搜尋 Drive 應該回傳檔案。

Actual:
畫面顯示授權 / permission error。

請依序分析：
1. Browser
2. Apps Script execution
3. GCP API enablement
4. OAuth / permissions

先找 root cause，再提出修改方案。
```

---

# Part 14：你現在其實已經碰到完整 Web App 架構

做到這裡，你已經用過：

```text
Frontend
Backend
GCP Project
API enablement
OAuth
Permissions
Gmail
Google Drive
Function call
Error handling
Deploy
```

架構：

```text
                Google Auth / OAuth
                       │
                       ▼
Browser ─────► Apps Script Backend
                       │
              ┌────────┴────────┐
              ▼                 ▼
           Gmail              Drive
```

這比單純叫 AI「幫我生一個網站」已經跨了一大步。

---

# Part 15：下一個練習

完成後不要重新做另一個 Demo，直接擴充同一個專案。

可以選一個：

```text
A. Gmail 搜尋框
   讓使用者自己輸入 Gmail query

B. Drive 資料夾模式
   顯示某個旅行資料夾裡的所有檔案

C. 行程整合
   把 Gmail 的訂位信 + Drive 文件整理成一張 Trip Card

D. AI Summary
   再接 AI API，讓 Backend 摘要旅遊信件

E. Google Calendar
   把航班 / 住宿日期加入 Calendar
```

這時再叫 Codex / Claude：

```text
請先閱讀目前專案。
不要直接修改。

我要新增「Trip Card」。
資料來源是 Gmail 與 Drive。

先提出：
- 資料結構
- Backend function
- Frontend 需要改哪裡
- 權限是否需要增加
- 測試方式

我確認後再實作。
```

這就是從 Vibe Coding 進入真正工程工作流的開始。
