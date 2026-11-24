# 📘 SIGMA PHARMA SYSTEM — MASTER AI DIRECTIVE & ARCHITECTURE GUIDE
> **ເອກະສານກຳນົດໂຄງສ້າງລະບົບ, ຫຼັກການພັດທະນາ, ແລະ ຂໍ້ຫ້າມສຳລັບ AI (Master Guidelines for AI Assistants)**
> 
> *ເອກະສານນີ້ຖືກສ້າງขึ้นເພື່ອເປັນຄູ່ມືຫຼັກ (Master Reference Document) ໃຫ້ AI ທຸກໂຕທີ່ເຂົ້າມາສືບຕໍ່ພັດທະນາ Project ນີ້ ເພື່ອໃຫ້ເຂົ້າໃຈໂຄງສ້າງລະບົບ, ທຸລະກິດ, UI/UX, ແລະ ບໍ່ໃຫ້ອັບເດດນອກທາງ ຫຼື ແກ້ໄຂຜິດຫຼັກການເດັດຂາດ.*

---

## 🛑 1. ຂໍ້ຫ້າມສຳຄັນ ແລະ ຫຼັກການທີ່ AI ທຸກໂຕຕ້ອງປະຕິບັດຕາມ (STRICT AI GUARDRAILS)

### ❌ ສິ່ງທີ່ຫ້າມເຮັດເດັດຂາດ (NEVER DO THIS):
1. **ຫ້າມລົບ ຫຼື ປ່ຽນແປງ Business Logic ດັ້ງເດີມ**:
   - ຫ້າມແກ້ໄຂ API Endpoints, Google Sheets Integration, ວິທີຄິດໄລ່ເງິນ, POS Logic, ການຕັດສະຕ໋ອກສິນຄ້າ, ລະບົບສ່ວນຫຼຸດ, ຫຼື ລະບົບສິດ (Role Permissions) ໂດຍບໍ່ມີຄຳສັ່ງແຈ້ງຈາກຜູ້ໃຊ້.
2. **ຫ້າມແຍກ Code ລະບົບເປັນ App ສອງໂຕ**:
   - ລະບົບນີ້ເປັນ **Web Application ເດີມໂຕດຽວ (Unified Codebase)**. ຫ້າມສ້າງ Mobile App ແຍກ (ເຊັ່ນ: Flutter, React Native, ຫຼື ເຮັດ HTML ແຍກ).
3. **ປັບ UI ຕາມຈໍມືຖືຈິງ (Responsive PWA)**:
   - ໃຫ້ຈັດວາງ UI ຕາມ viewport ຈິງ (320px–430px ສຳລັບມືຖື), ມີ role navigation ສຳລັບ touch ແລະຕິດຕັ້ງເປັນ PWA ຈາກ browser ໄດ້. ຫ້າມສ້າງປຸ່ມທີ່ອ້າງວ່າປ່ຽນໂໝດແລ້ວເປັນ native/mobile app.
4. **ຫ້າມໃຊ້ `overflow-x: hidden` ເປັນຕັດບັນຫາ responsive ມັກງ່າຍ**:
   - ຕ້ອງກວດຫາ Root cause ຂອງ element ທີ່ລົ້ນຈໍ ແລະ ແກ້ໄຂ CSS pixel bounds ໃຫ້ຖືກຕ້ອງ.
5. **ຮັກສາການຂະຫຍາຍໜ້າຈໍ ແລະຄວາມສາມາດ PWA**:
   - ໃຫ້ browser ປັບ layout ຕາມຂະໜາດຈໍຈິງ; ຫ້າມປິດ pinch-to-zoom ແລະຢ່າໃຊ້ CSS `zoom` ມາແທນ responsive layout. Cache ໄດ້ສະເພາະ app shell/assets; ຫ້າມ cache API, auth ຫຼືຂໍ້ມູນທຸລະກິດ. ຟັງຊັນຂໍ້ມູນຕ້ອງ online.
6. **ຫ້າມແກ້ໄຂປຸ່ມຕັ້ງຄ່າບັນຊີໃຫ້ເ້ດງໄປ Dashboard**:
   - ປຸ່ມ `⚙️ ຕັ້ງຄ່າບັນຊີ` ຕ້ອງເປີດ `<ProfileSettingsModal />` ຊ້ອນເທິງໜ້າເດີມ ເພື່ອໃຫ້ຜູ້ໃຊ້ແກ້ໄຂຊື່, ເບີໂທ, ທີ່ຢູ່, ແລະ ລະຫັດຜ່ານ ໂດຍບໍ່ເ້ດງກັບໄປໜ້າ Dashboard!
7. **ຫ້າມເຮັດໃຫ້ລາຄາສະແດງຜົນເປັນ `NaN ₭`**:
   - ຕ້ອງໃຊ້ Safe Numeric Parser (`parsePrice` / `formatPriceNum`) ໃນການປ່ຽນຄ່າ `bulkPrice` / `price` ເພື່ອປ້ອງກັນບໍ່ໃຫ້ເກີດ `NaN ₭`.

---

## 🏛️ 2. ໂຄງສ້າງລະບົບ (SYSTEM ARCHITECTURE OVERVIEW)

### 🛠️ Technology Stack:
- **Frontend Framework**: React 18 + Vite (Single Page Application - SPA).
- **Styling**: Vanilla CSS (`src/index.css` & `src/App.css`) ພ້ອມ CSS Variables (`var(--card)`, `var(--border)`, `var(--accent-*)`).
- **Icons**: FontAwesome 6 (Free Solid & Regular).
- **Database / Storage**: 
  - Local JSON Mock Files (`products.json`, `orders.json`, `customers.json`, `users.json`).
  - Google Sheets API Integration (`src/api/googleSheets.js`) ສຳລັບການ Sync ຂໍ້ມູນກັບ Cloud.
  - Browser storage ສຳລັບ session/user preferences; responsive layout ຄຳນວນຈາກ viewport ຈິງ.
- **Production Server Deployment**:
  - Hosting: VPS Server `216.128.148.179`
  - Web Server / Reverse Proxy: Nginx
  - Process Manager: PM2 (`pm2 restart all`)
  - Target Web Directory: `/var/www/sigma-backend/dist`

---

## 👥 3. ບົດບາດຜູ້ໃຊ້ງານ ແລະ ສິດ (ROLE-BASED ACCESS CONTROL)

| Role Code | Role Name | ຄວາມສາມາດ ແລະ ໜ້າທີ່ຫຼັກ |
| :--- | :--- | :--- |
| `super` | **Super Admin** | ເບິ່ງ Dashboard ວິເຄາະການຂາຍ, ຈັດການບັນຊີແອັດມິນ/ລູກຄ້າ, ຕັ້ງຄ່າບໍລິສັດ, ຈັດການສາງສິນຄ້າ (Inventory), ຈັດການຈັດສົ່ງ (Dispatch), ເບິ່ງອໍເດີທັງໝົດ. |
| `admin` | **Admin** | ເບິ່ງ Admin Dashboard, ກວດສອບ/ຢືນຢັນຄິວ Slip (Pending Orders Queue), ຈັດການສາງສິນຄ້າ (Inventory), ຈັດການຈັດສົ່ງ (Dispatch). |
| `sales` | **Sales (POS)** | ໜ້າຈໍຂາຍໜ້າຮ້ານ (POS Cashier Counter), ສ່ວນຫຼຸດ, ອອກບີນຊຳລະເງິນ/ພຣີອໍເດີ, ກວດສະຕ໋ອກສິນຄ້າ. |
| `customer` | **Customer** | ຕະຫຼາດກາງຊື້-ຂາຍຢາ (Marketplace), ຕິດຕາມອໍເດີຂ້ອຍ, ອັບໂຫຼດ Slip ໂອນເງິນ, ເບິ່ງບີນ/ໃບກຳກັບ, ຈັດການ Wishlist ແລະ Cart. |
| `itsupport` | **IT Support** | Local DB Explorer, ກວດສອບ/Export JSON, ຈັດການສາງ, ຈັດການບັນຊີຜູ້ໃຊ້. |

---

## 🎨 4. ມາດຕະຖານ UI/UX ລະບົບ (DESIGN SYSTEM & MOBILE PATTERNS)

### 📱 1. Mobile Marketplace (`page === 'marketplace'`):
- **Search Bar (`.search-pill-wrapper`)**:
  - ຄວາມສູງ compact 38px, ຂອບມົນ 20px, padding `4px 12px`, ຄວາມກວ້າງ `100%` ໃນ Mobile Mode.
- **Product Grid (`.marketplace-grid`)**:
  - ໃນຈໍມືຖື (320px–430px) ຕ້ອງສະແດງ **2 Product Cards ຕໍ່ 1 ແຖວ** ເທົ່ານັ້ນ (`grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 10px !important;`).
  - ຮູບສິນຄ້າສູງ 110px, ຊື່ຢາ line-clamp 2 ແຖວ, ສະຕ໋ອກ Badge ມົນ, ປຸ່ມຊື້ຄວາມກວ້າງ 100%.

### 🍔 2. Mobile Drawer Menu (`3 ຂີດ`):
- **User Profile Info Card (ດ້ານເທິງສຸດ)**:
  - ສະແດງ **ຊື່ຜູ້ໃຊ້**, **Badge ບົດບາດ (ສີປະຈຳບົດບາດ)**, **Username ID**, ປຸ່ມ **`⚙️ ຕັ້ງຄ່າບັນຊີ`**, ແລະ ປຸ່ມ **`ອອກຈາກລະບົບ`**.
- **Menu Items List (ດ້ານລຸ່ມ)**:
  - ໂຊແຕ່ເມນູຫຼັກ (`ຕະຫຼາດກາງ`, `ແດຊບອດ`, `ສາງ`, `ຂາຍ`, `ໜ້າຫຼັກ/ລ໋ອກອິນ`).
  - **ຫ້າມມີປຸ່ມ `ຕັ້ງຄ່າບັນຊີຜູ້ໃຊ້` ຊ້ຳກັນໃນເມນູລຸ່ມ** ເພາະມີປຸ່ມຢູ່ Profile Card ດ້ານເທິງແລ້ວ!

### 📋 3. ໂຄງສ້າງໜ້າ ອໍເດີ (Orders Architecture):
- **ໜ້າລາຍການ ອໍເດີທັງໝົດ (`page === 'orders'` / Bottom Nav `ອໍເດີ`)**:
  - ຕ້ອງສະແດງ **ALL ORDERS (ອໍເດີທັງໝົດ)** ທຸກສະຖານະ (`Pending`, `Paid`, `Shipping`, `Completed`).
  - ມີ Filter Pills ด้านເທິງ: `[ ທັງໝົດ ]`, `[ ລໍຖ້າກວດ ]`, `[ ຢືນຢັນແລ້ວ ]`, `[ ຈັດສົ່ງ ]`, `[ ສຳເລັດ ]`.
- **ພາກສ່ວນ ອໍເດີ ຢູ່ Admin Dashboard**:
  - ຕ້ອງສະແດງສະເພາະ **Pending Orders Queue (ຄິວອໍເດີລໍຖ້າກວດ Slip)** ເພື່ອໃຫ້ແອັດມິນກວດ Slip ແລະ ຢືນຢັນໄດ້ໄວ.

### 📦 4. ລະບົບຄຸ້ມຄອງສາງລະອຽດ (Advanced Inventory System):
- **Integrated Sub-Tabs**: ຈັດລວມ sub-tabs **`🚚 ຈັດສົ່ງສິນຄ້າ (Dispatch)`** ແລະ **`📦 ລະບົບຄຸ້ມຄອງສາງ (Inventory)`** ຢູ່ພາຍໃນ Super Admin & Admin Dashboard.
- **Mobile Touch Stock Cards (`.mobile-inventory-cards`)**: ເທິງມືຖື ຕ້ອງປ່ຽນຕາຕະລາງໃຫຍ່ເປັນ Stock Cards (ໂຊຮູບ/Emoji, ຊື່, ບາໂຄດ, ສະຕ໋ອກ Badge ສີຂຽວ/ແດງ, ໝວດໝູ່, ລາຄາ, ບ່ອນເກັບ, ວັນໝົດອາຍຸ, ປຸ່ມ `[ ✏️ ໄຂຂໍ້ມູນ ]` ແລະ `[ 🗑️ ລົບ ]`).

### ⚙️ 5. Profile & Account Settings Modal (`<ProfileSettingsModal />`):
- ເປັນ Pop-up Modal ຊ້ອນເທິງໜ້າເດີມ.
- ອະນຸຍາດໃຫ້ທຸກບົດບາດແກ້ໄຂ: **ຊື່-ນາມສະກຸນ**, **ເບີໂທ**, **ອີເມວ**, **ທີ່ຢູ່**, **ບ່ອນຈັດສົ່ງ**, ແລະ **ປ່ຽນລະຫັດຜ່ານ (Password Change)**.
- ເມື່ອບັນທຶກແລ້ວ ໃຫ້ Sync `loggedInUser` state, `localStorage`, ແລະ Google Sheets ໂດຍບໍ່ເ້ດງກັບໄປໜ້າ Dashboard.

---

## 📂 5. ໂຄງສ້າງ Directory & ໄຟລ໌ຫຼັກ (FILE MAP)

```
c:/Users/Acer/Desktop/ລະບົບຄວມຄຸມອົງກອນ/01/web-app/
├── src/
│   ├── App.jsx                       # Main Application Shell, Router, State Management, Modals
│   ├── App.css                       # Base Layout & Global Styles
│   ├── index.css                     # Design System, Component Tokens, Responsive & Mobile Overrides
│   ├── api/
│   │   └── googleSheets.js           # API Layer connecting to Google Sheets Apps Script Backend
│   └── components/
│       ├── MobileBottomNav.jsx       # Role-specific touch navigation for narrow viewports
│       ├── ProfileSettingsModal.jsx  # Modal for user self-profile & password editing
│       ├── SuperAdminPortal.jsx      # Super Admin Analytics, Admins/Customers Mgmt, Company Settings
│       ├── AdminPortal.jsx           # Admin Dashboard Metrics, Pending Slip Queue
│       ├── CustomerPortal.jsx        # Customer Orders List, Slip Uploader, Invoice Viewer
│       ├── InventoryPortal.jsx       # Advanced Inventory Mgmt, Stock-In Form, Mobile Touch Cards
│       ├── SalesPortal.jsx           # Sales POS Cashier Counter, Cart, Receipt Generator
│       ├── DispatchPortal.jsx        # Dispatch & Delivery Tracker, Status Updates
│       └── ITSupportPortal.jsx       # Local DB Explorer, Backup/Restore JSON Tool
├── dist/                             # Compiled Production Build Assets (Vite Bundle)
├── deploy_vps_atomic_fast.py         # Python Script for Fast Atomic Deployment to Live VPS
├── check_vps.py                      # Python Script to Verify Live Bundle Status on VPS
├── products.json                     # Fallback Local Product Data
├── orders.json                       # Fallback Local Orders Data
├── customers.json                    # Fallback Local Customer Accounts Data
└── users.json                        # Fallback Local User Accounts Data
```

---

## 🚀 6. ຂັ້ນຕອນການ Build ແລະ Deploy ຂຶ້ນ Server ແທ້ (DEPLOYMENT PROTOCOL)

ເມື່ອແກ້ໄຂ Code ຮຽບຮ້ອຍແລ້ວ ຕ້ອງປະຕິບັດຕາມຂັ້ນຕອນນີ້ທຸກຄັ້ງ:

1. **ກວດສອບ Build (Vite Build)**:
   ```bash
   npx vite build
   ```
   *ຕ້ອງ Build ຜ່ານ cleanly ໂດຍບໍ່ມີ Error.*

2. **Commit & Push ຂຶ້ນ GitHub**:
   ```bash
   git add .
   git commit -m "feat/fix: ລາຍລະອຽດການແກ້ໄຂ"
   git push origin main
   ```

3. **Deploy ຂຶ້ນ VPS Server (`216.128.148.179`)**:
   ```bash
   python deploy_vps_atomic_fast.py
   ```
   *Script ນີ້ຈະ Upload Code ແລະ Bundle ໄປທີ່ `/var/www/sigma-backend/dist` ແລ້ວ Reload Nginx & PM2.*

4. **ກວດສອບ Bundle ເທິງ Server ແທ້**:
   ```bash
   python check_vps.py
   ```
   *ຕ້ອງຂຶ້ນ Status 200 OK ແລະ ສະແດງ Hash ຂອງ Bundle ໃໝ່.*

---

## 📌 7. ສະຫຼຸບສິ່ງທີ່ AI ຕ້ອງຈື່ (FINAL MANDATE FOR FUTURE AIs)
> **"ທຸກໆການອັບເດດ Code ເທິງ Project ນີ້ ຕ້ອງຮັກສາ Business Logic, Role Permissions, ໂຄງສ້າງຖານຂໍ້ມູນ, ແລະ Mobile-First App-Like UX ໃຫ້ສົມບູນແບບ 100%. ຫ້າມແກ້ໄຂອອກນອກທາງ, ຫ້າມເຮັດໃຫ້ເກີດ `NaN ₭`, ຫ້າມເຮັດໃຫ້ປຸ່ມຕັ້ງຄ່າບັນຊີເ້ດງກັບ Dashboard, ແລະ ຕ້ອງ Deploy ເຂົ້າ Server `216.128.148.179` ໃຫ້ຮຽບຮ້ອຍທຸກຄັ້ງ!"**
