# Setup Instructions

## Quick Start

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Create backend environment file:**
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Then edit `backend/.env` and update the `ADMIN_SECRET` with your desired password:
   ```env
   ADMIN_SECRET=your-actual-secret-password-here
   ```

3. **Update frontend admin secret (optional but recommended):**
   
   Edit `frontend/src/pages/AdminPanel.jsx` and change line 6:
   ```javascript
   const ADMIN_SECRET = 'your-actual-secret-password-here'; // Must match backend .env
   ```
   
   **Note:** In production, you should handle this server-side to avoid exposing the secret in the frontend code.

4. **Start the development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend API on `http://localhost:3001`
   - Frontend app on `http://localhost:3000`

## Environment Variables

Your `backend/.env` file should contain:

```env
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
```

## First Time Setup

1. Make sure MongoDB is accessible (the connection string is already configured)
2. Visit `http://localhost:3000/admin-secret-route-here`
3. Enter your admin password
4. Create your first entry!

## Troubleshooting

- **MongoDB connection errors:** Check that your MongoDB URI is correct and the database is accessible
- **Cloudinary upload errors:** Verify your Cloudinary credentials are correct
- **Port already in use:** Change the PORT in `backend/.env` or kill the process using port 3001

