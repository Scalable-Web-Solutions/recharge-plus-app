# Recharge + PWA

A premium, executive-grade Progressive Web App for scheduling and accessing corporate wellness recharge rooms.

## 🎨 Design

- **Color Scheme**: Deep navy (#0F172A) primary, soft cream (#FFFDF7) background, white cards
- **Typography**: Inter font family with medium weights and ample spacing
- **Style**: Premium, sophisticated, executive aesthetic with subtle shadows
- **Mobile-first**: Fully responsive and touch-optimized for professional use

## 🚀 Features

- ✅ Professional login screen with Stack Auth integration (ready)
- ✅ Executive dashboard with room status and booking management
- ✅ Sophisticated booking scheduler with date/time picker
- ✅ Clean QR code generation for secure room entry
- ✅ PWA support (installable on mobile devices)
- ✅ Premium UI with subtle transitions
- ✅ State management with Zustand

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **State**: Zustand
- **Animations**: Framer Motion
- **QR Codes**: qrcode.react
- **Date Picker**: react-datepicker

## 🛠️ Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## 📱 PWA Installation

The app is installable as a PWA on mobile devices:

1. Open the app in a mobile browser
2. Look for "Add to Home Screen" prompt
3. Install and launch from your home screen

## 🔐 Authentication

Currently using mock authentication. To integrate Stack Auth:

1. Sign up at [Stack Auth](https://stack-auth.com)
2. Get your API keys
3. Update the login logic in `app/login/page.tsx`
4. Add Stack Auth SDK and configuration

## 📂 Project Structure

```
app/
├── login/          # Login page
├── home/           # Main dashboard
├── schedule/       # Booking scheduler
├── qr/             # QR code display
├── layout.tsx      # Root layout with PWA setup
└── globals.css     # Global styles

components/
├── Header.tsx      # App header
├── BottomNav.tsx   # Bottom navigation
├── Button.tsx      # Reusable button component
├── Card.tsx        # Card container
└── StatusBadge.tsx # Status indicator

lib/
├── store.ts        # Zustand state management
└── utils.ts        # Utility functions

public/
├── manifest.json   # PWA manifest
└── sw.js          # Service worker
```

## 🎯 Next Steps

1. **Add Icons**: Create 192x192 and 512x512 PNG icons for PWA
2. **Stack Auth**: Integrate real authentication
3. **Backend**: Connect to Firestore for bookings
4. **Notifications**: Implement push notifications for reminders
5. **Testing**: Add user testing and feedback collection

## 🎨 Design Inspiration

The UI follows modern mobile app design principles:
- Large, touch-friendly buttons
- Ample whitespace
- Smooth transitions
- Clear visual hierarchy
- Calming color palette

## 📝 Notes

- Mock data is used for room status and bookings
- Service worker caches key routes for offline access
- All routes except `/login` require authentication
- QR codes are generated client-side with booking data

---

Built with ❤️ for a better recharge experience
