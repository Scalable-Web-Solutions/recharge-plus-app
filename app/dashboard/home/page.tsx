'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { formatTime, formatDate, isWithinMinutes } from '@/lib/utils';
import { useUser } from '@stackframe/stack';

export default function HomePage() {
  const router = useRouter();
  const stackUser = useUser();
  const { booking } = useStore();
  const [roomStatus, setRoomStatus] = useState<{
    isOccupied: boolean;
    expiresAt?: string;
  }>({ isOccupied: false });

  const canCheckIn = booking && isWithinMinutes(booking.scheduledTime, 10);
  const hasUpcomingBooking = booking && booking.status === 'scheduled';

  // Check room status
  useEffect(() => {
    const checkRoomStatus = async () => {
      try {
        const response = await fetch('/api/rooms/status?roomId=0');
        const data = await response.json();
        setRoomStatus(data);
      } catch (error) {
        // Silently handle error
      }
    };

    checkRoomStatus();
    
    // Poll every 10 seconds
    const interval = setInterval(checkRoomStatus, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    {
      icon: (
        <svg className="w-8 h-8 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Digital Check-In",
      subtitle: "Quick access to the wellness circuit",
      action: () => router.push('/dashboard/qr')
    },
    {
      icon: (
        <svg className="w-8 h-8 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
        </svg>
      ),
      title: "Smart Booking",
      subtitle: "View real-time availability and reserve sessions",
      action: () => router.push('/dashboard/schedule')
    },
    {
      icon: (
        <svg className="w-8 h-8 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
      title: "Wellness Products",
      subtitle: "Discover and purchase curated items",
      action: () => router.push('/dashboard/products')
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="text-center pb-12 px-6 pt-18">
        <div className="border-t border-b border-navy/20 py-8 mb-8 max-w-md mx-auto">
          <h1 className="text-4xl font-light text-navy tracking-[0.2em] mb-2">RECHARGE +</h1>
          <p className="text-sm text-gray-text font-medium tracking-widest uppercase">By Recharge Room</p>
        </div>
        <p className="text-xl text-navy font-light leading-relaxed max-w-sm mx-auto">
          Elevated Wellness for Elevated Living.
        </p>
      </div>

      {/* Menu Items */}
      <div className="px-6 space-y-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="w-full bg-white/80 backdrop-blur-sm rounded-3xl p-6 flex items-center gap-4 transition-all duration-300 hover:bg-white hover:luxury-shadow-lg active:scale-[0.98] luxury-border"
          >
            <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center luxury-border shrink-0">
              {item.icon}
            </div>
            <div className="text-left flex-1">
              <h3 className="text-lg font-semibold text-navy mb-1">{item.title}</h3>
              <p className="text-sm text-gray-text leading-relaxed">{item.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Book Now Button */}
      <div className="px-6 pb-8">
        <button
          onClick={() => router.push('/dashboard/qr')}
          className="w-full bg-transparent border-2 border-navy text-navy py-4 rounded-full text-lg font-semibold tracking-wide transition-all duration-300 hover:bg-navy hover:text-white"
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
}