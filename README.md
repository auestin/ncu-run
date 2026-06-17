# 中央大學漾跑社 報名系統

這是一個使用 Vite + React 開發的前端報名網頁。擁有高質感的 UI 設計，並支援將表單資料直接寫入 Google Sheets，不需要伺服器或資料庫即可運作。

## 1. 圖片資源準備

在您的原始碼資料夾中找到 `public/` 資料夾，並放入以下兩張圖片：
1. `size-chart.png` (衣服尺寸表)
2. `tshirt-design.png` (衣服設計圖)

這樣網頁就能正確顯示這兩張圖片。

## 2. Google Sheets 後端設定 (Google Apps Script)

因為 GitHub Pages 只支援靜態網頁，我們使用 Google Apps Script 來接收表單資料。

### 步驟 1: 建立 Google 試算表
1. 登入 Google 帳號，開啟 [Google 試算表](https://sheets.google.com)。
2. 建立一個全新的空白試算表。
3. 在第一列 (Row 1) 依序填寫以下標題 (A1 ~ J1)：
   `Timestamp`, `name`, `gender`, `phone`, `email`, `studentId`, `emergencyContact`, `size`, `distance`, `pace`, `healthDeclaration`
   *(注意：這些欄位名稱必須與程式碼中的 `name` 屬性完全一致)*
4. 將該試算表的工作表名稱重新命名為 `Sheet1` (如果不是的話)。

### 步驟 2: 建立 Apps Script
1. 在試算表的上方選單點擊 **擴充功能 (Extensions)** -> **Apps Script**。
2. 將編輯器內原本的程式碼清空，貼上以下程式碼：

```javascript
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    // 取得當下時間
    const timestamp = new Date();
    
    // 從前端表單取得的資料
    const name = e.parameter.name || '';
    const gender = e.parameter.gender || '';
    const phone = e.parameter.phone || '';
    const email = e.parameter.email || '';
    const studentId = e.parameter.studentId || '';
    const emergencyContact = e.parameter.emergencyContact || '';
    const size = e.parameter.size || '';
    const distance = e.parameter.distance || '';
    const pace = e.parameter.pace || '';
    const healthDeclaration = e.parameter.healthDeclaration || '';

    // 依序寫入試算表
    sheet.appendRow([
      timestamp, 
      name, 
      gender, 
      phone, 
      email, 
      studentId, 
      emergencyContact, 
      size, 
      distance, 
      pace, 
      healthDeclaration
    ]);

    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 步驟 3: 部署 Apps Script
1. 點擊編輯器右上角的 **部署 (Deploy)** -> **新增部署作業 (New deployment)**。
2. 點擊左上角齒輪圖示，選擇 **網頁應用程式 (Web app)**。
3. 設定：
   - 執行身分：**我 (您的 Email)**
   - 誰可以存取：**所有人 (Anyone)**
4. 點擊 **部署**。
5. 過程中會要求您「授權存取」，請同意並允許 (可能會出現警告畫面，請點擊 "進階" -> "前往...")。
6. 部署完成後，複製畫面上顯示的 **網頁應用程式網址 (Web app URL)**。

### 步驟 4: 將 URL 貼回專案
1. 回到程式碼編輯器，打開 `src/App.jsx`。
2. 找到 `const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';` 這一行。
3. 將您剛剛複製的 URL 貼上去替換。
4. 將下方的 `fetch` 註解區塊打開（取消註解），並把 `setTimeout` 模擬請求的部分刪除。

## 3. 本地端開發與測試

如果您想在自己的電腦上預覽：
```bash
npm install
npm run dev
```

## 4. 部署至 GitHub Pages

此專案已配置為 Vite 專案。若要部署至 GitHub Pages，請參考以下指令建立 GitHub 倉庫並上傳：

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin <您的_GITHUB_REPO_URL>
git push -u origin main
```

您可以直接前往 GitHub 設定 (Settings) -> Pages，將來源選擇 GitHub Actions 或指定 Branch 來開啟 Pages 服務。
