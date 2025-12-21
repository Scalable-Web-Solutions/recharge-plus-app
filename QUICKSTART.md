# 🚀 Quick Start Guide

Get Recharge + running in 3 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Generate placeholder icons
node scripts/generate-icons.js

# 3. Start development server
npm run dev
```

## Open the App

Navigate to [http://localhost:3000](http://localhost:3000)

## Test the Flow

### 1. Login Page
- Enter any email (e.g., `test@example.com`)
- Enter any password
- Click "Sign In"

### 2. Home Dashboard
- See your greeting and room status
- View the "Room Available Now" badge
- Click "Enter Recharge Room Now" to see QR code
- Or click "Schedule a Recharge" to book

### 3. Schedule a Booking
- Pick a date and time
- Click "Confirm Booking"
- Return to home to see your booking

### 4. QR Code Display
- Click "Enter Recharge Room Now" or "Check In Now"
- See your QR code
- Watch the countdown timer
- Click "Done" to return

## Mobile Testing

### Option 1: Local Network
```bash
# Find your local IP
ipconfig  # Windows
ifconfig  # Mac/Linux

# Access from mobile
http://YOUR_IP:3000
```

### Option 2: Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Access from mobile using the provided URL
```

## PWA Installation (Mobile)

1. Open the deployed app in mobile browser
2. Look for "Add to Home Screen" prompt
3. Tap "Add" or "Install"
4. Launch from home screen like a native app

## Features to Test

- ✅ Login with any credentials
- ✅ View room status on home
- ✅ Schedule a booking with date/time picker
- ✅ Generate QR code for entry
- ✅ Bottom navigation between Home and Schedule
- ✅ Logout from header
- ✅ Smooth animations and transitions
- ✅ Responsive mobile design

## Build for Production

```bash
# Create optimized build
npm run build

# Test production build locally
npm start
```

## Troubleshooting

### Port 3000 already in use
```bash
# Use different port
PORT=3001 npm run dev
```

### Dependencies not installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
# Check TypeScript errors
npm run build

# Clear Next.js cache
rm -rf .next
npm run build
```

## Next Steps

1. **Customize Colors**: Edit `app/globals.css` theme variables
2. **Add Real Auth**: Integrate Stack Auth (see SETUP.md)
3. **Connect Backend**: Add Firestore for bookings
4. **Push Notifications**: Implement reminders
5. **Custom Icons**: Replace SVG icons with PNG designs

## Project Structure

```
recharge-plus-app/
├── app/              # Pages and routes
├── components/       # Reusable UI components
├── lib/              # State and utilities
├── public/           # Static assets
└── scripts/          # Helper scripts
```

## Useful Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Run ESLint
node scripts/generate-icons.js  # Generate icons
```

## Documentation

- **README.md**: Project overview and features
- **SETUP.md**: Detailed setup and integration guide
- **PROJECT_OVERVIEW.md**: Architecture and design system
- **QUICKSTART.md**: This file!

## Support

- Check documentation files for detailed info
- Review code comments for implementation details
- Test on multiple devices for best experience

---

**Ready to recharge!** ⚡

Start customizing and building your perfect recharge room experience.
