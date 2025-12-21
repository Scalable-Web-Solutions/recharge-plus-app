'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/Button';
import { useUser } from '@stackframe/stack';

export default function SessionTimerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stackUser = useUser();
  const preFeeling = searchParams.get('preFeeling');
  
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setIsComplete(true);
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const progress = ((15 * 60 - timeRemaining) / (15 * 60)) * 100;

  const handleEndSession = async () => {
    // End the session in Firebase
    try {
      await fetch('/api/rooms/end-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: '0' }),
      });
    } catch (error) {
      // Silently handle error
    }

    router.push(`/dashboard/post-session?preFeeling=${preFeeling}`);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-border overflow-hidden">
          {/* Header */}
          <div className="bg-navy px-8 py-6 border-b border-gray-border">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Recharge Session Active</h1>
              <p className="text-white/80 text-sm">
                {stackUser?.displayName || stackUser?.primaryEmail?.split('@')[0] || 'Guest'}
              </p>
            </div>
          </div>

          {/* Timer Display */}
          <div className="p-12">
            {!isComplete ? (
              <>
                {/* Circular Progress */}
                <div className="relative w-64 h-64 mx-auto mb-8">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="#E2E8F0"
                      strokeWidth="16"
                      fill="none"
                    />
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="#0F172A"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 120}`}
                      strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-6xl font-bold text-navy tabular-nums">
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </div>
                    <p className="text-sm text-gray-text mt-2">minutes remaining</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-navy transition-all duration-1000 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Status Message */}
                <div className="text-center mb-8">
                  <p className="text-lg text-gray-text">
                    Enjoy your recharge time
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Session Complete */}
                <div className="text-center mb-8">
                  <div className="w-24 h-24 rounded-full bg-emerald flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-navy mb-3">Session Complete!</h2>
                  <p className="text-lg text-gray-text mb-6">
                    Your 15-minute recharge session has ended
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full h-14 text-lg"
                  onClick={handleEndSession}
                >
                  Complete Check-Out
                </Button>
              </>
            )}

            {/* Early End Option */}
            {!isComplete && (
              <div className="mt-8 pt-6 border-t border-gray-border">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={handleEndSession}
                >
                  End Session Early
                </Button>
              </div>
            )}

            {/* Info */}
            <div className="mt-8 pt-6 border-t border-gray-border">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy mb-1">Pre-Session Feeling</p>
                  <p className="text-xs text-gray-text leading-relaxed">
                    You rated your mood as {preFeeling}/10 before starting
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
