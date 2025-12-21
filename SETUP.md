# Recharge + Setup Guide

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Generate placeholder icons**
   ```bash
   node scripts/generate-icons.js
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Testing the PWA

### Desktop Testing
1. Open Chrome DevTools (F12)
2. Go to Application tab
3. Check "Service Workers" and "Manifest"
4. Use Lighthouse to audit PWA score

### Mobile Testing
1. Deploy to a hosting service (Vercel recommended)
2. Open on mobile device
3. Look for "Add to Home Screen" prompt
4. Install and test offline functionality

## Stack Auth Integration

To integrate Stack Auth for real authentication:

1. **Sign up for Stack Auth**
   - Visit [https://stack-auth.com](https://stack-auth.com)
   - Create a new project
   - Get your API keys

2. **Install Stack Auth SDK**
   ```bash
   npm install @stackframe/stack
   ```

3. **Create environment variables**
   Create `.env.local`:
   ```
   NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id
   NEXT_PUBLIC_STACK_PUBLISHABLE_KEY=your_publishable_key
   ```

4. **Update app/login/page.tsx**
   Replace the mock login with Stack Auth:
   ```typescript
   import { useStackApp } from '@stackframe/stack';
   
   const stackApp = useStackApp();
   await stackApp.signInWithOAuth('google');
   ```

5. **Add Stack Auth Provider**
   Wrap your app in `app/layout.tsx`:
   ```typescript
   import { StackProvider } from '@stackframe/stack';
   
   <StackProvider projectId={process.env.NEXT_PUBLIC_STACK_PROJECT_ID}>
     {children}
   </StackProvider>
   ```

## Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
```typescript
colors: {
  navy: {
    DEFAULT: '#001F3F',  // Change this
    dark: '#001529',
    light: '#003366',
  },
  cream: {
    DEFAULT: '#FEFAF6',  // Change this
    light: '#FFFEF9',
    dark: '#FFFDD0',
  },
}
```

### Icons
Replace placeholder icons in `/public`:
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `favicon.ico`

### Branding
Update `public/manifest.json`:
```json
{
  "name": "Your App Name",
  "short_name": "YourApp",
  "description": "Your description"
}
```

## Backend Integration

### Firestore Setup (Future)
1. Create Firebase project
2. Enable Firestore
3. Add Firebase config
4. Create collections:
   - `users` - User profiles
   - `bookings` - Booking records
   - `rooms` - Room status

### API Routes
Create API routes in `app/api/`:
- `/api/bookings` - CRUD for bookings
- `/api/rooms/status` - Get room availability
- `/api/notifications` - Send push notifications

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically
4. Add environment variables in Vercel dashboard

### Other Platforms
- **Netlify**: Similar to Vercel
- **AWS Amplify**: Good for AWS integration
- **Railway**: Simple deployment with database

## Troubleshooting

### Service Worker Not Registering
- Check browser console for errors
- Ensure HTTPS (required for PWA)
- Clear browser cache and reload

### Styles Not Loading
- Run `npm run build` to check for errors
- Verify Tailwind config is correct
- Check import paths

### TypeScript Errors
- Run `npm run build` to see all errors
- Check `tsconfig.json` paths configuration
- Ensure all dependencies are installed

## Performance Optimization

1. **Image Optimization**
   - Use Next.js Image component
   - Compress images before upload
   - Use WebP format

2. **Code Splitting**
   - Already handled by Next.js
   - Use dynamic imports for heavy components

3. **Caching**
   - Service worker caches routes
   - Add more routes to `public/sw.js`

## Security Checklist

- [ ] Enable HTTPS in production
- [ ] Validate all user inputs
- [ ] Implement rate limiting
- [ ] Use secure QR code tokens
- [ ] Add CSRF protection
- [ ] Sanitize database queries
- [ ] Implement proper authentication

## Next Features to Build

1. **Push Notifications**
   - 10-minute reminder before booking
   - Room availability alerts

2. **User Profile**
   - Edit profile information
   - View booking history
   - Preferences and settings

3. **Admin Dashboard**
   - Manage room availability
   - View all bookings
   - Analytics and reports

4. **Social Features**
   - Share booking with friends
   - Group bookings
   - Feedback and ratings

---

Need help? Check the main README.md or create an issue on GitHub.
