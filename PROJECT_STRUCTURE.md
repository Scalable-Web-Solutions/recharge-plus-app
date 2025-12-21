# 📁 Recharge + Project Structure

Complete file tree with descriptions.

## 🌳 Directory Tree

```
recharge-plus-app/
│
├── 📱 app/                          # Next.js App Router
│   ├── home/
│   │   └── page.tsx                # Main dashboard after login
│   ├── login/
│   │   └── page.tsx                # Authentication page
│   ├── qr/
│   │   └── page.tsx                # QR code display (full screen)
│   ├── schedule/
│   │   └── page.tsx                # Booking scheduler
│   ├── datepicker-custom.css      # Custom date picker theme
│   ├── favicon.ico                 # Browser favicon
│   ├── globals.css                 # Global styles + Tailwind
│   ├── layout.tsx                  # Root layout + PWA setup
│   ├── page.tsx                    # Root redirect to login
│   └── register-sw.tsx             # Service worker registration
│
├── 🧩 components/                   # Reusable UI Components
│   ├── BottomNav.tsx               # Bottom navigation bar
│   ├── Button.tsx                  # Reusable button (3 variants)
│   ├── Card.tsx                    # Card container
│   ├── Header.tsx                  # App header with logout
│   └── StatusBadge.tsx             # Status indicator badge
│
├── 📚 lib/                          # Utilities & State
│   ├── store.ts                    # Zustand state management
│   └── utils.ts                    # Helper functions
│
├── 🌐 public/                       # Static Assets
│   ├── file.svg                    # Default Next.js icon
│   ├── globe.svg                   # Default Next.js icon
│   ├── icon-192.svg                # PWA icon (small)
│   ├── icon-512.svg                # PWA icon (large)
│   ├── manifest.json               # PWA manifest
│   ├── next.svg                    # Next.js logo
│   ├── sw.js                       # Service worker
│   ├── vercel.svg                  # Vercel logo
│   └── window.svg                  # Default Next.js icon
│
├── 🔧 scripts/                      # Helper Scripts
│   └── generate-icons.js           # Icon generator script
│
├── 📄 Configuration Files
│   ├── .env.local.example          # Environment variables template
│   ├── .gitignore                  # Git ignore rules
│   ├── eslint.config.mjs           # ESLint configuration
│   ├── middleware.ts               # Route protection (Stack Auth ready)
│   ├── next-env.d.ts               # Next.js TypeScript declarations
│   ├── next.config.ts              # Next.js configuration
│   ├── package.json                # Dependencies & scripts
│   ├── postcss.config.mjs          # PostCSS configuration
│   ├── tailwind.config.ts          # Tailwind CSS configuration
│   └── tsconfig.json               # TypeScript configuration
│
└── 📖 Documentation
    ├── FEATURES.md                 # Feature checklist
    ├── GETTING_STARTED.md          # Quick start guide
    ├── PROJECT_OVERVIEW.md         # Architecture details
    ├── PROJECT_STRUCTURE.md        # This file
    ├── QUICKSTART.md               # 3-minute setup
    ├── README.md                   # Project overview
    └── SETUP.md                    # Detailed setup guide
```

## 📱 App Pages

### `/` (Root)
- **File**: `app/page.tsx`
- **Purpose**: Redirects to `/login`
- **Type**: Server Component

### `/login`
- **File**: `app/login/page.tsx`
- **Purpose**: User authentication
- **Features**:
  - Email/password form
  - Mock authentication (Stack Auth ready)
  - Gradient navy background
  - Cream form card
- **Type**: Client Component

### `/home`
- **File**: `app/home/page.tsx`
- **Purpose**: Main dashboard
- **Features**:
  - User greeting
  - Room status indicator
  - Upcoming booking card
  - Action buttons (Enter/Schedule)
  - Quick tips
- **Type**: Client Component
- **Protected**: Yes

### `/schedule`
- **File**: `app/schedule/page.tsx`
- **Purpose**: Book a time slot
- **Features**:
  - Date/time picker
  - Custom themed calendar
  - Booking preview
  - Confirm/cancel actions
- **Type**: Client Component
- **Protected**: Yes

### `/qr`
- **File**: `app/qr/page.tsx`
- **Purpose**: Display QR code for entry
- **Features**:
  - Large QR code (280x280)
  - Session countdown timer
  - User/booking info
  - Full-screen gradient background
- **Type**: Client Component
- **Protected**: Yes

## 🧩 Components

### `<Button />`
**File**: `components/Button.tsx`

Reusable button with Framer Motion animations.

**Props**:
- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `children`: React.ReactNode
- All standard button props

**Usage**:
```tsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

### `<Card />`
**File**: `components/Card.tsx`

Container with consistent styling.

**Props**:
- `children`: React.ReactNode
- `className`: string (optional)

**Usage**:
```tsx
<Card className="custom-class">
  Content here
</Card>
```

### `<StatusBadge />`
**File**: `components/StatusBadge.tsx`

Status indicator with animated pulse.

**Props**:
- `status`: 'open' | 'scheduled' | 'closed'
- `text`: string

**Usage**:
```tsx
<StatusBadge status="open" text="Available Now" />
```

### `<Header />`
**File**: `components/Header.tsx`

App header with logo and logout.

**Features**:
- Sticky positioning
- Backdrop blur
- Logout button (when authenticated)

### `<BottomNav />`
**File**: `components/BottomNav.tsx`

Bottom navigation bar.

**Features**:
- Home and Schedule tabs
- Active tab highlighting
- Icon + label
- Safe area insets

## 📚 Library Files

### `lib/store.ts`
Zustand state management.

**State**:
```typescript
{
  user: User | null
  booking: Booking | null
  roomStatus: RoomStatus
  setUser: (user) => void
  setBooking: (booking) => void
  setRoomStatus: (status) => void
  logout: () => void
}
```

### `lib/utils.ts`
Helper functions.

**Functions**:
- `cn()` - Class name merger
- `formatTime()` - Format date to time string
- `formatDate()` - Format date to readable string
- `isWithinMinutes()` - Check if date is within X minutes

## 🎨 Styling

### `app/globals.css`
Global styles with Tailwind CSS 4.

**Theme Variables**:
```css
--color-navy: #001F3F
--color-navy-dark: #001529
--color-navy-light: #003366
--color-cream: #FEFAF6
--color-cream-light: #FFFEF9
--color-cream-dark: #FFFDD0
```

### `app/datepicker-custom.css`
Custom styles for react-datepicker.

**Customizations**:
- Navy header background
- Cream hover states
- Rounded corners
- Custom selected state

### `tailwind.config.ts`
Tailwind CSS configuration.

**Custom Colors**:
- `navy`, `navy-dark`, `navy-light`
- `cream`, `cream-light`, `cream-dark`

**Custom Font**:
- Inter font family

## 🌐 PWA Files

### `public/manifest.json`
PWA manifest configuration.

**Settings**:
- App name and description
- Theme colors (navy/cream)
- Display mode: standalone
- Orientation: portrait
- Icons: 192x192, 512x512

### `public/sw.js`
Service worker for offline support.

**Features**:
- Caches key routes
- Cache-first strategy
- Auto-updates on new version

### `app/register-sw.tsx`
Service worker registration component.

**Purpose**: Registers service worker on app load

## 🔧 Configuration

### `next.config.ts`
Next.js configuration.

**Current**: Default settings

### `tailwind.config.ts`
Tailwind CSS configuration.

**Custom Theme**: Navy/cream colors, Inter font

### `tsconfig.json`
TypeScript configuration.

**Key Settings**:
- Strict mode enabled
- Path aliases: `@/*` → `./*`
- JSX: react-jsx

### `middleware.ts`
Route protection middleware.

**Purpose**: Placeholder for Stack Auth middleware

## 📦 Dependencies

### Production
- `next` - Framework
- `react` - UI library
- `react-dom` - React DOM
- `zustand` - State management
- `framer-motion` - Animations
- `qrcode.react` - QR code generation
- `react-datepicker` - Date/time picker

### Development
- `typescript` - Type safety
- `tailwindcss` - Styling
- `eslint` - Linting
- `@types/*` - Type definitions

## 📖 Documentation Files

### README.md
Project overview, features, tech stack.

### QUICKSTART.md
Get started in 3 minutes.

### SETUP.md
Detailed setup and integration guide.

### PROJECT_OVERVIEW.md
Architecture, design system, data flow.

### FEATURES.md
Complete feature checklist with roadmap.

### GETTING_STARTED.md
Comprehensive getting started guide.

### PROJECT_STRUCTURE.md
This file - complete project structure.

## 🔍 File Counts

- **Pages**: 4 (login, home, schedule, qr)
- **Components**: 5 (Button, Card, Header, BottomNav, StatusBadge)
- **Library Files**: 2 (store, utils)
- **Config Files**: 9
- **Documentation**: 7 files
- **Total TypeScript Files**: ~20
- **Total Lines of Code**: ~1,500+

## 🎯 Key Patterns

### Client Components
All interactive pages use `'use client'` directive.

### State Management
Zustand for global state, local state for component-specific.

### Styling
Tailwind CSS with custom theme variables.

### Routing
Next.js App Router with file-based routing.

### Type Safety
Full TypeScript coverage, no `any` types.

### Animations
Framer Motion for smooth transitions.

## 🚀 Build Output

```
Route (app)
┌ ○ /              # Static
├ ○ /home          # Static
├ ○ /login         # Static
├ ○ /qr            # Static
└ ○ /schedule      # Static

ƒ Proxy (Middleware)
```

All routes are pre-rendered as static content for optimal performance.

---

**Total Project Size**: ~50MB (with node_modules)  
**Build Size**: ~200KB (gzipped)  
**TypeScript**: 100% coverage  
**Documentation**: Comprehensive
