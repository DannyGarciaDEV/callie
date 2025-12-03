#!/bin/bash

echo "🚀 Starting Callie Love Calendar..."
echo ""

# Check if .env exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Creating .env file from template..."
    cat > backend/.env << EOF
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
    echo "✅ Created backend/.env file"
    echo "⚠️  Please update ADMIN_SECRET in backend/.env and frontend/src/pages/AdminPanel.jsx"
    echo ""
fi

# Check if node_modules exist
if [ ! -d "backend/node_modules" ] || [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm run install-all
    echo ""
fi

echo "🎯 Starting servers..."
npm run dev

