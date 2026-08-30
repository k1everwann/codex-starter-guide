function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Travel Workspace Dashboard');
}

/**
 * 讀取最近一年、主旨看起來像旅遊預訂的 Gmail threads。
 * 為了教學與隱私，只回傳寄件者、主旨、日期，不回傳完整信件內容。
 */
function getTravelEmails() {
  const query = 'newer_than:365d {subject:flight subject:hotel subject:booking subject:reservation subject:ticket}';
  const threads = GmailApp.search(query, 0, 10);

  return threads.map(thread => {
    const messages = thread.getMessages();
    const message = messages[messages.length - 1];

    return {
      subject: message.getSubject(),
      from: message.getFrom(),
      date: message.getDate().toISOString()
    };
  });
}

/**
 * 搜尋自己 Google Drive 中檔名含有 keyword 的檔案。
 * DriveApp 的 searchFiles 使用 Drive API v2 查詢欄位，所以檔名欄位是 title。
 */
function searchDriveFiles(keyword) {
  const text = String(keyword || '').trim();
  if (!text) return [];

  const escaped = text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'");

  const files = DriveApp.searchFiles(
    `trashed = false and title contains '${escaped}'`
  );

  const result = [];
  while (files.hasNext() && result.length < 10) {
    const file = files.next();
    result.push({
      name: file.getName(),
      url: file.getUrl(),
      mimeType: file.getMimeType(),
      updated: file.getLastUpdated().toISOString()
    });
  }

  return result;
}

/**
 * 可在 Apps Script 編輯器手動執行一次，用來確認授權與服務都正常。
 */
function testAccess() {
  const gmailCount = GmailApp.search('newer_than:7d', 0, 1).length;
  const hasDriveFile = DriveApp.getFiles().hasNext();

  console.log({ gmailCount, hasDriveFile });
}
