# Troubleshooting Guide

## Issue: "Running another code" or Wrong Code Executing

If you're seeing different code than expected, try these steps:

### 1. Verify You're in the Correct Directory
```bash
cd /Users/dannygarcia/Desktop/callie
pwd  # Should show: /Users/dannygarcia/Desktop/callie
```

### 2. Clear Any Cached Builds
```bash
# Remove any build artifacts
rm -rf frontend/dist
rm -rf frontend/node_modules/.vite
rm -rf backend/node_modules
rm -rf frontend/node_modules
```

### 3. Install Dependencies Fresh
```bash
npm run install-all
```

### 4. Check for Running Processes
```bash
# Kill any processes on ports 3000 or 3001
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### 5. Verify Your Code Files
Make sure these files exist and have the correct content:
- `backend/server.js` - Should import express, mongoose, cors, dotenv
- `frontend/src/App.jsx` - Should have Routes for Calendar, MessageReader, AdminPanel
- `frontend/src/pages/Calendar.jsx` - Should exist

### 6. Check for .env File
```bash
ls -la backend/.env
# If it doesn't exist, create it (see SETUP.md)
```

### 7. Start Fresh
```bash
# Use the start script
./start.sh

# OR manually:
npm run dev
```

## Common Errors

### "Cannot find module"
- Run: `npm run install-all`
- Make sure you're in the project root directory

### "Port already in use"
- Kill the process: `lsof -ti:3001 | xargs kill -9`
- Or change PORT in `backend/.env`

### "MongoDB connection error"
- Check your `MONGODB_URI` in `backend/.env`
- Make sure MongoDB Atlas allows your IP address

### "Module not found" in frontend
- Delete `frontend/node_modules` and `frontend/package-lock.json`
- Run: `cd frontend && npm install`

## Verify Installation

Run these commands to verify everything is set up:

```bash
# Check backend dependencies
cd backend && npm list --depth=0

# Check frontend dependencies  
cd ../frontend && npm list --depth=0

# Check if server starts
cd ../backend && node server.js
# (Press Ctrl+C to stop, then start with npm run dev)
```

## Still Having Issues?

1. Make sure Node.js version is 18+:
   ```bash
   node --version
   ```

2. Check that all files were created:
   ```bash
   ls -R backend/
   ls -R frontend/src/
   ```

3. Try running backend and frontend separately:
   ```bash
   # Terminal 1
   cd backend && npm run dev
   
   # Terminal 2
   cd frontend && npm run dev
   ```

