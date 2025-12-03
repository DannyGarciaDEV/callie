# Callie's Love Calendar

A personal web application where Danny posts daily love messages for Callie, displayed as an unlockable calendar with photos.

## Features

- 📅 **Calendar View**: Browse messages by date with a beautiful month grid
- 💌 **Daily Messages**: Read today's message or browse past entries
- 📸 **Photo Gallery**: View images associated with each message
- 🔐 **Admin Panel**: Secure portal for posting and managing entries
- 🎨 **Goth Theme**: Dark, romantic aesthetic with smooth animations

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Image Storage**: Cloudinary (Events & Profile buckets)
- **Styling**: CSS with goth-themed design

## Setup

### Prerequisites

- Node.js (v18+)
- MongoDB connection string
- Cloudinary accounts (Events & Profile)

### Installation

1. Install dependencies:
```bash
npm run install-all
```

2. Configure environment variables:
   - Copy `backend/.env.example` to `backend/.env`
   - Fill in your MongoDB URI and Cloudinary credentials
   - Set your `ADMIN_SECRET` password

3. Start development servers:
```bash
npm run dev
```

This will start:
- Backend API on `http://localhost:3001`
- Frontend app on `http://localhost:3000`

## Usage

### Public Site (Callie's View)
- Visit `http://localhost:3000` to see the calendar
- Click on any date with an entry to read the message
- Today's message is highlighted at the top

### Admin Panel (Danny's View)
- Visit `http://localhost:3000/admin-secret-route-here`
- Enter the admin password (set in `ADMIN_SECRET`)
- Create, edit, or delete entries
- Upload multiple images per entry

## API Endpoints

### Public Endpoints
- `GET /api/entries` - Get all entries
- `GET /api/entries/:date` - Get entry by date (YYYY-MM-DD)
- `GET /api/entries/today/entry` - Get today's entry

### Admin Endpoints (require authentication)
- `POST /api/admin/entries` - Create new entry
- `PUT /api/admin/entries/:id` - Update entry
- `DELETE /api/admin/entries/:id` - Delete entry
- `GET /api/admin/entries` - Get all entries (with IDs)
- `POST /api/upload/events/multiple` - Upload multiple images

## Deployment

### Backend
Deploy to Render, Railway, or similar:
- Set environment variables
- Point to MongoDB Atlas
- Ensure Cloudinary credentials are set

### Frontend
Deploy to Vercel, Netlify, or similar:
- Build command: `cd frontend && npm run build`
- Output directory: `frontend/dist`
- Set API proxy or update API_URL in frontend code

## Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3001

# Cloudinary Events
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

# Cloudinary Profile
CLOUDINARY_PROFILE_NAME=your_profile_cloud_name
CLOUDINARY_PROFILE_KEY=your_profile_api_key
CLOUDINARY_PROFILE_SECRET=your_profile_api_secret

# Admin Authentication
ADMIN_SECRET=your-secret-password
```

## Project Structure

```
callie/
├── backend/
│   ├── config/
│   │   └── cloudinary.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── Entry.js
│   ├── routes/
│   │   ├── entries.js
│   │   ├── admin.js
│   │   └── upload.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Calendar.jsx
│   │   │   ├── MessageReader.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── styles/
│   │   │   ├── Calendar.css
│   │   │   ├── MessageReader.css
│   │   │   └── AdminPanel.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── vite.config.js
└── package.json
```

## License

Private project for personal use.

# callie
