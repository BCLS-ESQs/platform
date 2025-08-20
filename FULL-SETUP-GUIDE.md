# 🚀 ESQs Platform - Full Frontend + Backend Setup Guide

## 🎯 Goal: Get Both Frontend and Backend Working Together

This guide will help you set up the complete ESQs Platform with working buttons that connect to your local backend API.

## 📋 Prerequisites

1. **Node.js installed** (version 16 or higher)
2. **All files in the same folder**
3. **LAWMatrix database** (optional - will use demo data if not available)

## 🚀 Quick Start (Recommended)

### Option 1: Use the Batch File
1. **Double-click**: `START-BOTH-FRONTEND-BACKEND.bat`
2. **Wait** for both services to start
3. **Frontend opens** automatically in your browser

### Option 2: Manual Setup
Follow the steps below for manual control.

## 🔧 Step-by-Step Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Backend Server
```bash
npm start
```

**Expected Output:**
```
🚀 ESQs Platform Backend Server running on port 3000
🌐 Access from: http://localhost:3000
📁 Connected to F: Drive: F:\
📋 Connected to Practice Panther: F:\Dropbox\Dropbox\PracticePanther
✅ Connected to LAWMatrix database
```

### Step 3: Test Backend API
```bash
node test-backend.js
```

**Expected Output:**
```
🧪 Testing ESQs Platform Backend...

🔍 Testing Health Check...
✅ Health Check: { success: true, status: 'running', ... }

🔍 Testing Practice Panther Cases...
✅ Practice Panther Cases: { success: true, cases: [...] }

🔍 Testing F: Drive Browse...
✅ F: Drive Browse: { success: true, contents: [...] }
```

### Step 4: Open Frontend
1. **Open**: `index.html` in your browser
2. **Or navigate to**: `http://localhost:3000` (if you want to serve it from backend)
3. **Check browser console** (F12) for initialization messages

## 🎯 What Should Work Now

### ✅ Frontend Buttons
- **Practice Panther** → Shows real/demo case data from backend
- **F: Drive Browse** → Shows real/demo file structure from backend
- **F: Drive Search** → Searches real/demo files from backend
- **Voice Control** → Starts/stops voice recognition
- **Document Management** → Saves/loads documents locally

### ✅ Backend API Endpoints
- `GET /api/health` → Server status
- `GET /api/practice-panther/cases` → All cases
- `GET /api/practice-panther/search?query=...` → Search cases
- `GET /api/f-drive/browse` → Browse F: drive
- `GET /api/f-drive/search?query=...` → Search F: drive
- `POST /api/documents/save` → Save documents

## 🔍 Troubleshooting

### Backend Won't Start
1. **Check if port 3000 is free**:
   ```bash
   netstat -an | findstr :3000
   ```
2. **Kill process using port 3000**:
   ```bash
   taskkill /F /PID <PID_NUMBER>
   ```

### Database Connection Fails
- **No worries!** The system will use demo data
- **Check console** for "Database connection failed" messages
- **Demo data will work** for testing

### Frontend Buttons Still Don't Work
1. **Check browser console** (F12) for errors
2. **Verify backend is running** on port 3000
3. **Test API manually**: `http://localhost:3000/api/health`

### CORS Issues
- Backend includes CORS middleware
- Should work from any origin
- If issues persist, check browser console for CORS errors

## 🧪 Testing Your Setup

### Test 1: Backend Health
```bash
curl http://localhost:3000/api/health
```

### Test 2: Practice Panther
```bash
curl http://localhost:3000/api/practice-panther/cases
```

### Test 3: F: Drive
```bash
curl http://localhost:3000/api/f-drive/browse
```

### Test 4: Frontend Buttons
1. Open `index.html`
2. Click **Practice Panther** button
3. Should see case data (real or demo)
4. Click **F: Drive Browse** button
5. Should see file structure (real or demo)

## 🌐 Production Deployment

### Option 1: Local Network
- Backend runs on your machine
- Frontend accessible from other devices on network
- Use your machine's IP address instead of localhost

### Option 2: Cloud Deployment
- Deploy backend to Render.com, Heroku, or similar
- Update `API_BASE` in `index.html` to point to cloud URL
- Frontend can be hosted on GitHub Pages

## 📱 Mobile Testing

1. **Start backend** on your computer
2. **Find your computer's IP address**:
   ```bash
   ipconfig
   ```
3. **On mobile device**, navigate to: `http://YOUR_IP:3000`
4. **Test all buttons** on mobile

## 🎉 Success Indicators

When everything is working:
- ✅ Backend server shows "running on port 3000"
- ✅ Frontend buttons respond to clicks
- ✅ API calls return data (real or demo)
- ✅ No JavaScript errors in browser console
- ✅ Voice control works (if microphone enabled)

## 🆘 Still Having Issues?

1. **Check all error messages** in both terminal and browser console
2. **Verify Node.js version**: `node --version`
3. **Reinstall dependencies**: `npm install`
4. **Try different browser** (Chrome, Firefox, Edge)
5. **Check Windows Firewall** isn't blocking port 3000

---

**Remember**: The system includes fallback demo data, so buttons should work even if some backend services aren't available!
