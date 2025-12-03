# Quick Start Guide

## The Issue: "Running Another Code"

If you're seeing errors or wrong code, it's because **dependencies aren't installed yet**. The code files are all correct! ✅

## Fix It Now (3 Steps):

### Step 1: Install Dependencies
```bash
npm run install-all
```

This will install all packages for backend and frontend.

### Step 2: Create .env File
```bash
cd backend
cat > .env << 'EOF'
MONGODB_URI=mongodb+srv://dannygarciadev:rUfN6tMzFujP3x@cluster0.nbqmops.mongodb.net/callie?retryWrites=true&w=majority
PORT=3001

# Cloudinary Events
CLOUDINARY_NAME=df0whbpf6
CLOUDINARY_KEY=211963775584371
CLOUDINARY_SECRET=E8IaKJWTkJ7vWSkTNi-dkXA1DgI

# Cloudinary Profile
CLOUDINARY_PROFILE_NAME=dozme1czg
CLOUDINARY_PROFILE_KEY=148454755566469
CLOUDINARY_PROFILE_SECRET=vaIy-kGF8S98vmkU8x91SbO0Bzo

# Admin Authentication
ADMIN_SECRET=your-secret-password-here
EOF
cd ..
```

**Important:** Change `your-secret-password-here` to your actual password!

### Step 3: Update Frontend Admin Secret
Edit `frontend/src/pages/AdminPanel.jsx` line 6:
```javascript
const ADMIN_SECRET = 'your-secret-password-here'; // Must match backend .env
```

### Step 4: Start the App
```bash
npm run dev
```

## Verify Everything Works

Run the verification script:
```bash
node verify-setup.js
```

All checks should pass ✅

## What You'll See

- **Backend:** Running on `http://localhost:3001`
- **Frontend:** Running on `http://localhost:3000`
- **Admin Panel:** `http://localhost:3000/admin-secret-route-here`

## Still Having Issues?

See `TROUBLESHOOTING.md` for detailed help.

