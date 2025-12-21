'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Button } from '@/components/Button';
import { QRCodeSVG } from 'qrcode.react';
import { useUser } from '@stackframe/stack';

export default function QRPage() {
  const router = useRouter();
  const stackUser = useUser();
  const { booking } = useStore();
  const [refreshKey, setRefreshKey] = useState(0);
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(60);
  const [currentCode, setCurrentCode] = useState<string | null>(null);
  const [scannedSuccessfully, setScannedSuccessfully] = useState(false);

  const bookingCode = useMemo(() => {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  }, [refreshKey]);

  useEffect(() => {
    if (bookingCode) {
      fetch('/api/qr-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingCode }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setCurrentCode(bookingCode);
          }
        })
        .catch(() => {});
    }
  }, [bookingCode]);

  // Poll to check if code was scanned (room session created)
  useEffect(() => {
    if (!stackUser?.id) return;

    const checkIfScanned = async () => {
      try {
        const response = await fetch('/api/rooms/status?roomId=0');
        const data = await response.json();
        
        // If room is occupied by this user, code was scanned
        if (data.isOccupied && data.userId === stackUser.id) {
          setScannedSuccessfully(true);
          
          // Redirect to pre-session survey after 2 seconds
          setTimeout(() => {
            router.push('/dashboard/pre-session');
          }, 2000);
        }
      } catch (error) {
        // Silently handle error
      }
    };

    // Check every 2 seconds for scan
    const scanCheckInterval = setInterval(checkIfScanned, 2000);

    return () => clearInterval(scanCheckInterval);
  }, [stackUser?.id, router]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeUntilRefresh((prev) => (prev <= 1 ? 60 : prev - 1));
    }, 1000);

    const refreshInterval = setInterval(() => {
      if (currentCode) {
        fetch(`/api/qr-codes?code=${currentCode}`, { method: 'DELETE' })
          .catch(() => {});
      }
      setRefreshKey((prev) => prev + 1);
      setTimeUntilRefresh(60);
    }, 60000);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(refreshInterval);
      if (currentCode) {
        fetch(`/api/qr-codes?code=${currentCode}`, { method: 'DELETE' })
          .catch(() => {});
      }
    };
  }, [currentCode]);

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Success Popup */}
      {scannedSuccessfully && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="bg-white rounded-3xl luxury-shadow-xl max-w-md w-full p-8 text-center animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-emerald flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-navy mb-3 tracking-tight">Code Scanned!</h2>
            <p className="text-lg text-gray-text mb-2">Access granted successfully</p>
            <p className="text-sm text-gray-text">Redirecting to check-in...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center pt-16 pb-8 px-6">
        <button
          onClick={() => router.push('/dashboard/home')}
          className="inline-flex items-center gap-2 text-gray-text hover:text-navy transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </button>
        
        <div className="border-t border-b border-navy/20 py-6 mb-6 max-w-md mx-auto">
          <h1 className="text-3xl font-light text-navy tracking-[0.15em]">ENTRY PASS</h1>
        </div>
        <p className="text-lg text-navy font-light leading-relaxed">
          Present this code at the entrance
        </p>
      </div>

      {/* QR Code Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl luxury-shadow-lg luxury-border p-8 text-center">
            {/* QR Code */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-2xl p-6 luxury-border">
                <QRCodeSVG
                  value={bookingCode}
                  size={200}
                  level="H"
                  fgColor="#0A1628"
                  bgColor="#FFFFFF"
                />
              </div>
            </div>

            {/* Timer */}
            <div className="mb-6 p-4 bg-navy/5 rounded-2xl luxury-border">
              <p className="text-xs font-semibold text-gray-text mb-2 tracking-wide uppercase">Code refreshes in</p>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-2xl font-bold text-navy tabular-nums">
                  {timeUntilRefresh}s
                </p>
              </div>
            </div>

            {/* Booking Code */}
            <div className="mb-6 p-4 bg-cream rounded-2xl luxury-border">
              <p className="text-xs font-semibold text-gray-text mb-2 tracking-wide uppercase">Booking Code</p>
              <p className="text-xl font-mono font-bold text-navy tracking-wider">
                {bookingCode}
              </p>
            </div>

            {/* User Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between py-3 px-4 bg-cream/50 rounded-xl">
                <span className="text-sm font-semibold text-gray-text">User</span>
                <span className="text-sm font-bold text-navy">{stackUser?.displayName || stackUser?.primaryEmail || 'Guest'}</span>
              </div>
              {booking && (
                <div className="flex items-center justify-between py-3 px-4 bg-cream/50 rounded-xl">
                  <span className="text-sm font-semibold text-gray-text">Booking Time</span>
                  <span className="text-sm font-bold text-navy">
                    {new Date(booking.scheduledTime).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="pt-6 border-t luxury-border">
              <div className="flex items-start gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-navy mb-1">How to use</p>
                  <p className="text-sm text-gray-text leading-relaxed">
                    Position the QR code in front of the scanner at the entrance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
