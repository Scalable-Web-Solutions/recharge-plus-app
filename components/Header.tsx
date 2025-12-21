'use client';

import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export function Header() {
  const { user, logout } = useStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 border-b border-gray-border/50 backdrop-blur-xl luxury-shadow">
      <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-navy to-navy-light flex items-center justify-center luxury-shadow">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-navy tracking-tight">Recharge +</h1>
            <p className="text-xs text-gray-text font-medium">Executive Wellness</p>
          </div>
        </div>
        {user && (
          <button
            onClick={handleLogout}
            className="text-sm text-gray-text hover:text-navy transition-all duration-300 font-medium flex items-center gap-2 group px-4 py-2 rounded-lg hover:bg-cream-dark"
          >
            <span>Sign Out</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}
