# 🚪 ESQs Platform - Always On Setup Guide

## 🎯 Goal: Your Legal Workspace Door is Always Open

This guide will transform your ESQs Platform into a **permanent, always-accessible service** that starts automatically with Windows and stays running 24/7.

## 🚀 Quick Setup (Recommended)

### Step 1: Install as Windows Service
1. **Right-click** `install-windows-service.bat`
2. **"Run as Administrator"**
3. **Wait** for installation to complete
4. **Your platform is now always running!**

### Step 2: Create Desktop Shortcuts
1. **Run** `create-desktop-shortcuts.bat`
2. **Desktop shortcuts** will be created automatically
3. **Double-click any shortcut** to access your workspace instantly

## 🔧 Detailed Setup

### Option 1: Windows Service (Permanent)
```bash
# Run as Administrator
install-windows-service.bat
```

**What this does:**
- ✅ Installs PM2 globally
- ✅ Creates Windows service
- ✅ Starts automatically on boot
- ✅ Restarts automatically if it crashes
- ✅ Runs in background 24/7

### Option 2: Desktop Shortcuts (Quick Access)
```bash
# Run normally
create-desktop-shortcuts.bat
```

**What this creates:**
- 🚀 **ESQs Platform - Legal Workspace.bat** → Main platform
- 📋 **Practice Panther - Cases.bat** → Direct case access
- 📁 **F: Drive - Files.bat** → Direct file access
- 💚 **ESQs Health Check.bat** → Service status
- 🌐 **ESQs Frontend - HTML.bat** → HTML frontend

## 🎯 What You Get

### 🚪 **Always Open Doors**
- **Practice Panther** → Access your 162+ cases anytime
- **F: Drive** → Browse your 3TB files anytime
- **Document Management** → Save/load documents anytime
- **Voice Control** → Voice commands anytime
- **Legal Tools** → Utah Code, Federal Rules, Supreme Court cases

### ⚡ **Instant Access**
- **Desktop shortcuts** work like magic buttons
- **No waiting** for startup
- **Always ready** for legal work
- **Mobile accessible** from any device on your network

### 🔄 **Self-Healing**
- **Auto-restart** if service crashes
- **Auto-start** when Windows boots
- **Background monitoring** keeps it running
- **Health checks** ensure everything works

## 🧪 Testing Your Always-On Setup

### Test 1: Service Status
```bash
pm2 status
```
**Should show:** ESQs-Platform as "online"

### Test 2: Health Check
1. **Double-click** `💚 ESQs Health Check.bat`
2. **Should open:** Health status in browser
3. **Should show:** All systems operational

### Test 3: Main Platform
1. **Double-click** `🚀 ESQs Platform - Legal Workspace.bat`
2. **Should open:** Main platform in browser
3. **All buttons should work** with real data

### Test 4: Practice Panther
1. **Double-click** `📋 Practice Panther - Cases.bat`
2. **Should show:** Your 162+ real cases
3. **Data should load instantly**

### Test 5: F: Drive
1. **Double-click** `📁 F: Drive - Files.bat`
2. **Should show:** Your F: drive contents
3. **File browsing should work**

## 🔍 Troubleshooting

### Service Won't Start
1. **Run as Administrator**: `install-windows-service.bat`
2. **Check PM2**: `pm2 status`
3. **Manual start**: `pm2 start backend-server.js --name "ESQs-Platform"`

### Shortcuts Don't Work
1. **Ensure service is running**: `pm2 status`
2. **Check port 3000**: `netstat -an | findstr :3000`
3. **Recreate shortcuts**: Run `create-desktop-shortcuts.bat`

### Access Denied
1. **Check Windows Firewall** isn't blocking port 3000
2. **Run as Administrator** for service installation
3. **Verify Node.js** is installed and working

## 🌐 Network Access

### Local Network Access
Once running, other devices on your network can access:
- **Your IP**: `http://YOUR_COMPUTER_IP:3000`
- **Find your IP**: `ipconfig` in command prompt
- **Mobile devices** can access from anywhere on network

### Internet Access (Optional)
- **Port forwarding** on router (port 3000)
- **Dynamic DNS** for changing IP addresses
- **SSL certificate** for secure access

## 🎉 Success Indicators

When everything is working perfectly:
- ✅ **Service runs automatically** on Windows boot
- ✅ **Desktop shortcuts** open instantly
- ✅ **All buttons work** with real data
- ✅ **Accessible 24/7** from any device
- ✅ **Self-healing** if anything goes wrong
- ✅ **Like having a door** that's always open to your legal workspace

## 🚪 Your Legal Workspace Door

**Before:** You had to start the platform manually each time
**After:** Your legal workspace is always accessible - like having a door that never closes!

**Access anytime:**
- 🚀 **Main Platform** → Complete legal workspace
- 📋 **Practice Panther** → All your cases
- 📁 **F: Drive** → All your files
- 💚 **Health Check** → System status
- 🌐 **Frontend** → HTML interface

---

**🎯 Result:** Your ESQs Platform is now a permanent, always-accessible legal workspace that starts automatically and stays running 24/7!
