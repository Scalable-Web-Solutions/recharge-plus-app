'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';

export default function FirmwareScannerPage() {
  const [pin, setPin] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; userId?: string } | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleScan = async () => {
    if (!pin || pin.length !== 12) {
      setResult({ success: false, message: 'Please enter a valid 12-digit code' });
      return;
    }

    setIsScanning(true);
    setResult(null);

    try {
      const response = await fetch('/api/firmware/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: pin }),
      });

      const data = await response.json();

      if (data.success) {
        setResult({ success: true, message: `Access granted! Welcome, ${data.userName}`, userId: data.userName });
        setShowSuccessPopup(true);
        
        // Clear the success popup after 3 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
          setResult(null);
        }, 3000);
        
        setPin('');
      } else {
        setResult({ success: false, message: data.error || 'Invalid or expired code' });
      }
    } catch (error) {
      setResult({ success: false, message: 'Scanner error. Please try again.' });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-6">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-emerald flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-navy mb-3">Access Granted!</h2>
            <p className="text-lg text-gray-text">Welcome to the Recharge Room</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-border overflow-hidden">
          {/* Header */}
          <div className="bg-navy-light px-8 py-6 border-b border-navy/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Recharge Room</h1>
                <p className="text-white/70 text-sm">Entry Scanner v1.0</p>
              </div>
            </div>
          </div>

          {/* Scanner Body */}
          <div className="p-8">
            <div className="mb-6">
              <label htmlFor="pin" className="block text-sm font-semibold text-navy mb-3">
                Enter Access Code
              </label>
              <input
                id="pin"
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 12))}
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                className="w-full px-4 py-4 text-center text-2xl font-mono font-bold rounded-lg border-2 border-gray-border focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-0 transition-colors bg-cream tracking-wider"
                placeholder="000000000000"
                maxLength={12}
                disabled={isScanning}
              />
              <p className="text-xs text-gray-text mt-2 text-center">
                12-digit code from QR scanner
              </p>
            </div>

            {/* Result Display */}
            {result && (
              <div className={`mb-6 p-4 rounded-lg border-2 ${
                result.success 
                  ? 'bg-emerald/10 border-emerald text-emerald' 
                  : 'bg-red-50 border-red-300 text-red-700'
              }`}>
                <div className="flex items-center gap-3">
                  {result.success ? (
                    <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <p className="font-semibold">{result.message}</p>
                </div>
              </div>
            )}

            {/* Scan Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full h-14 text-lg"
              onClick={handleScan}
              disabled={isScanning || pin.length !== 12}
            >
              {isScanning ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Verify Access Code'
              )}
            </Button>

            {/* Info */}
            <div className="mt-8 pt-6 border-t border-gray-border">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy mb-1">Scanner Information</p>
                  <p className="text-xs text-gray-text leading-relaxed">
                    This is a firmware simulator for testing. In production, this would be a physical QR scanner at the entrance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-white/50 text-sm">
            Firmware Mode • Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}
