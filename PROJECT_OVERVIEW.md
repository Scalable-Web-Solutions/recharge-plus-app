# Recharge + Project Overview

## 🎯 Project Vision

Recharge + is a premium, executive-grade Progressive Web App designed to provide a sophisticated experience for scheduling and accessing corporate wellness recharge rooms. The app features a calm, professional aesthetic inspired by high-end hospitality and office management platforms.

## 🎨 Design System

### Color Palette
- **Primary Navy**: `#0F172A` - Main brand color, buttons, headers
- **Navy Dark**: `#020617` - Hover states, emphasis
- **Navy Light**: `#1E293B` - Subtle accents
- **Cream**: `#FFFDF7` - Background
- **Cream Light**: `#FFFFFF` - Cards, clean surfaces
- **Cream Dark**: `#FEFAE0` - Subtle backgrounds
- **Emerald**: `#10B981` - Success states, availability
- **Gray Border**: `#E2E8F0` - Borders, dividers
- **Gray Text**: `#64748B` - Secondary text

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, 24-48px
- **Body**: Regular, 14-16px
- **Small Text**: Medium, 12-14px

### Components
- **Buttons**: Rounded (8px), professional touch targets (min 44px)
- **Cards**: Rounded (8px), subtle shadows, light borders
- **Inputs**: Rounded (8px), clean borders with focus states
- **Spacing**: Generous whitespace, 4px base unit (4, 8, 12, 16, 24, 32, 48)
- **Status Badges**: Pill-shaped with solid colors
- **Typography**: Medium weights, ample line height for readability

## 📱 User Flow

```
1. Landing (/) → Redirects to Login
2. Login (/login) → Enter credentials → Home
3. Home (/home) → View status, bookings, actions
   ├─→ Schedule (/schedule) → Pick date/time → Confirm → Home
   └─→ QR Code (/qr) → Display QR → Scan → Done
```

## 🏗️ Architecture

### Frontend Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State**: Zustand (lightweight, simple)
- **Animations**: Framer Motion
- **QR**: qrcode.react
- **Date Picker**: react-datepicker

### File Structure
```
recharge-plus-app/
├── app/
│   ├── login/page.tsx          # Authentication
│   ├── home/page.tsx           # Main dashboard
│   ├── schedule/page.tsx       # Booking interface
│   ├── qr/page.tsx            # QR code display
│   ├── layout.tsx             # Root layout + PWA
│   ├── page.tsx               # Root redirect
│   ├── globals.css            # Global styles
│   ├── datepicker-custom.css  # Date picker theme
│   └── register-sw.tsx        # Service worker registration
├── components/
│   ├── Header.tsx             # App header with logout
│   ├── BottomNav.tsx          # Bottom navigation
│   ├── Button.tsx             # Reusable button
│   ├── Card.tsx               # Card container
│   └── StatusBadge.tsx        # Status indicator
├── lib/
│   ├── store.ts               # Zustand state management
│   └── utils.ts               # Helper functions
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   ├── icon-192.svg           # App icon (small)
│   └── icon-512.svg           # App icon (large)
├── scripts/
│   └── generate-icons.js      # Icon generator
├── middleware.ts              # Route protection
├── tailwind.config.ts         # Tailwind configuration
└── tsconfig.json              # TypeScript config
```

## 🔄 State Management

### Zustand Store (`lib/store.ts`)
```typescript
interface AppState {
  user: User | null              // Current user
  booking: Booking | null        // Active booking
  roomStatus: RoomStatus         // Room availability
  setUser: (user) => void
  setBooking: (booking) => void
  setRoomStatus: (status) => void
  logout: () => void
}
```

### Data Flow
1. User logs in → `setUser()` updates store
2. User books → `setBooking()` stores booking
3. Components read from store via hooks
4. No prop drilling, clean component tree

## 🔐 Authentication (Stack Auth Ready)

### Current Implementation
- Mock authentication in `app/login/page.tsx`
- Simulates 1-second login delay
- Stores user in Zustand store
- Redirects to `/home` on success

### Stack Auth Integration (Future)
```typescript
// Install: npm install @stackframe/stack
import { useStackApp } from '@stackframe/stack';

const stackApp = useStackApp();
await stackApp.signInWithOAuth('google');
```

## 📊 Features Breakdown

### ✅ Implemented
- [x] Login screen with form validation
- [x] Home dashboard with greeting
- [x] Room status indicator
- [x] Booking display card
- [x] Schedule interface with date/time picker
- [x] QR code generation and display
- [x] Bottom navigation
- [x] Header with logout
- [x] PWA manifest and service worker
- [x] Responsive mobile-first design
- [x] Smooth animations
- [x] Custom themed date picker

### 🚧 To Be Implemented
- [ ] Stack Auth integration
- [ ] Firestore backend
- [ ] Push notifications
- [ ] Booking history
- [ ] User profile editing
- [ ] Admin dashboard
- [ ] Real-time room status
- [ ] Booking cancellation
- [ ] Multiple room support
- [ ] Analytics

## 🎯 Key Components

### Button Component
```typescript
<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```
- Variants: primary, secondary, outline
- Sizes: sm, md, lg
- Framer Motion animations
- Touch-optimized

### Card Component
```typescript
<Card className="custom-class">
  Content here
</Card>
```
- Consistent styling
- Rounded corners
- Subtle shadows

### StatusBadge Component
```typescript
<StatusBadge status="open" text="Available Now" />
```
- Status types: open, scheduled, closed
- Animated pulse dot
- Color-coded

## 📱 PWA Features

### Manifest (`public/manifest.json`)
- App name and description
- Theme colors
- Display mode: standalone
- Orientation: portrait
- Icons: 192x192, 512x512

### Service Worker (`public/sw.js`)
- Caches key routes
- Offline support
- Cache-first strategy
- Auto-updates

### Installation
- Automatic prompt on mobile
- "Add to Home Screen"
- Launches like native app
- No browser chrome

## 🎨 Animation Strategy

### Framer Motion Usage
- Page transitions: fade + slide up
- Button interactions: scale on tap
- Staggered list animations
- Smooth state changes

### Performance
- GPU-accelerated transforms
- Minimal repaints
- 60fps target
- Reduced motion support (future)

## 🔒 Security Considerations

### Current
- Client-side only (no sensitive data)
- Mock authentication
- QR codes with timestamps

### Future
- HTTPS required (PWA standard)
- Secure token generation
- Rate limiting
- Input validation
- CSRF protection
- XSS prevention

## 📈 Performance Targets

- **Lighthouse Score**: 90+ (all categories)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 200KB (gzipped)
- **Mobile Performance**: 90+

## 🧪 Testing Strategy (Future)

### Unit Tests
- Component rendering
- State management
- Utility functions

### Integration Tests
- User flows
- API interactions
- Authentication

### E2E Tests
- Complete user journeys
- PWA installation
- Offline functionality

## 🚀 Deployment

### Recommended: Vercel
1. Push to GitHub
2. Import in Vercel
3. Auto-deploy on push
4. Environment variables in dashboard

### Requirements
- Node.js 18+
- HTTPS (for PWA)
- Environment variables for Stack Auth

## 📝 Development Workflow

1. **Start dev server**: `npm run dev`
2. **Make changes**: Edit files in `app/` or `components/`
3. **Test**: Open localhost:3000
4. **Build**: `npm run build`
5. **Deploy**: Push to GitHub → Vercel auto-deploys

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand Guide](https://github.com/pmndrs/zustand)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Stack Auth Docs](https://docs.stack-auth.com/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - Feel free to use for personal or commercial projects

---

**Built with modern web technologies for a seamless user experience** ✨
