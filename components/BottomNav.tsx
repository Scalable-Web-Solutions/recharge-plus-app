'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();

  const links = [
    { 
      href: '/dashboard/home', 
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      href: '/dashboard/schedule', 
      label: 'Schedule',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 border-t border-gray-border/50 safe-area-inset-bottom backdrop-blur-xl z-50 luxury-shadow-xl">
      <div className="max-w-5xl mx-auto px-6 py-3">
        <div className="flex justify-around">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex flex-col items-center gap-1.5 px-6 py-2.5 rounded-xl transition-all duration-300',
                  isActive
                    ? 'text-navy bg-navy/5 scale-105'
                    : 'text-gray-text hover:text-navy hover:bg-cream-dark'
                )}
              >
                <div className={cn('transition-transform duration-300', isActive && 'scale-110')}>
                  {link.icon}
                </div>
                <span className={cn('text-xs font-semibold tracking-wide', isActive && 'text-navy')}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
