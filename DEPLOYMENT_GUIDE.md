# Complete Guide: Running Locally & Deploying Your Project
## P10: Which Block is 34? — LPU Smart Campus Navigator

This guide explains **why the data was not connecting previously**, **how we fixed it**, **how to run it on your computer with 1 click**, and **how to deploy both frontend and backend for free on the internet**.

---

### 1. Why Was Your Project Not Working With Data Before?

There were three main technical reasons:
1. **No Visible Data Table in the UI:** The original survey data was stored inside `survey_data.json`, but `index.html` was only showing 4 summary numbers and a download button. There was no interactive table displaying the 16 real student survey questionnaires.
2. **Browser Local File (`file://`) Security Block:** When you double-click an `.html` file from Windows Explorer, your browser opens it using the `file://` protocol. Modern browsers (Chrome, Edge, Brave) automatically block `fetch('survey_data.json')` requests under `file://` for security reasons (Same-Origin Policy).
3. **No Running Backend Server:** There was no active server running on your computer to handle `/api/survey-data` or `/api/health` requests.

---

### 2. How We Fixed It (Dual-Mode Architecture)

We upgraded your application with a **Hybrid Architecture** that **works under all conditions**:
1. **Interactive Survey Data Explorer:** Added a full searchable and filterable table in Section 8 of `index.html` showing all 16 student survey responses (Harsh Gupta, M. Karthik, Aman Kumar Gupta, Prakhar, Deshraj, Venkat, etc.), their answers, and verbatim quotes.
2. **Backend REST API (`server.js`):** Built a Node.js server with active endpoints:
   - `http://localhost:3000/api/health` (Healthcheck)
   - `http://localhost:3000/api/survey-data` (16 survey records)
   - `http://localhost:3000/api/auth/login` (UMS login verification)
3. **Automatic Fallback (Zero Crashes):** If the backend server is running, the app shows:
   `🟢 Backend API: Connected`
   If you open `index.html` directly without a server or deploy on static hosting (like GitHub Pages or Netlify), it shows:
   `🟡 Standalone Mode (Embedded DB Active)`
   and loads all 16 survey records and timetables from embedded memory. **It will never fail or show a blank screen!**
4. **1-Click Local Runner (`start_project.bat`):** A Windows launcher that boots the server and opens your browser automatically.

---

### 3. How to Run It on Your Computer Right Now

#### Method 1: The Easiest Way (1-Click Launcher)
1. Go to your folder: `C:\Users\user\Downloads\int project`.
2. Double-click **`start_project.bat`**.
3. It will automatically start the backend server and open `http://localhost:3000` in your browser.
4. You will see `🟢 Backend API: Connected` at the top!

#### Method 2: Direct File Opening (No Terminal Required)
1. Double-click **`index.html`** in your folder.
2. The website will open immediately with full map routing, Block 34/36/37 pathways, UMS timetable sync, and the 16-student survey table active in Standalone Mode.

---

### 4. How to Deploy Online for Free (Step-by-Step)

You do **not** need any advanced DevOps knowledge. Choose either **Option A (Netlify - 60 seconds drag & drop)** or **Option B (Vercel)**:

#### Option A: Netlify Drag & Drop (Easiest — No Git or Terminal Needed!)
1. Open your browser and go to: [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Sign in with a free account (using Google or GitHub).
3. Open Windows Explorer to `C:\Users\user\Downloads\int project`.
4. Drag and drop the **entire `int project` folder** into the Netlify Drop box in your browser.
5. In 15 seconds, Netlify will give you a live URL (e.g., `https://lpu-campus-nav.netlify.app`).
6. Your website is now live on the internet with free HTTPS!

#### Option B: Vercel (Recommended for GitHub Users)
1. Push your folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Deploy LPU Campus Navigator"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/lpu-campus-navigator.git
   git push -u origin main
   ```
2. Go to [https://vercel.com](https://vercel.com) and log in with GitHub.
3. Click **"Add New Project"** and select your `lpu-campus-navigator` repository.
4. Click **"Deploy"**. Vercel will automatically read your `vercel.json` and deploy it globally within 30 seconds.

#### Option C: Render (Full-Stack Node.js Backend Server)
If your professor requires a live Node.js Express server running online:
1. Push your project to GitHub.
2. Go to [https://render.com](https://render.com) (free account).
3. Click **"New +" ➔ "Web Service"**.
4. Select your GitHub repository.
5. Set:
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
6. Click **"Create Web Service"**. Render will deploy your Node server and give you a free live backend URL!

---

### 5. Verifying Everything Works Before Presentation / Viva

Run the automated test suite in PowerShell or CMD to verify all pathways:
```bash
node test.js
```
Expected output:
```
🧪 Starting LPU Campus Navigator Automated Test Suite...

  ✅ [PASS] Campus graph nodes must contain valid coordinates and types
  ✅ [PASS] All graph edges must connect existing nodes with positive distance
  ✅ [PASS] Compulsory Pathway to Block 34 (Floor 5) from Gate 1 must compute accurately
  ✅ [PASS] Compulsory Pathway to Block 36 (Lecture Theatres) must compute accurately
  ✅ [PASS] Compulsory Pathway to Block 37 (Hidden North Wing) must utilize the North breezeway
  ✅ [PASS] All CA2 Team Members must be present in mock UMS accounts with valid timetables
  ✅ [PASS] survey_data.json must exist and contain exactly 16 verified questionnaire responses
  ✅ [PASS] Accessible routing mode should discourage stairways
  ✅ [PASS] Production PWA manifest and icons must exist

📊 Test Results: 9/9 Passed (100% Success Rate)
🎉 All production verification tests passed successfully!
```
