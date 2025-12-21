'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { useUser } from '@stackframe/stack';

export default function PreSessionPage() {
  const router = useRouter();
  const stackUser = useUser();
  const [selectedFeeling, setSelectedFeeling] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (selectedFeeling === null) return;

    setIsSubmitting(true);

    // Store the pre-session feeling (you can add an API route to save this to Firestore later)
    // For now, we'll pass it to the timer page via URL params
    router.push(`/dashboard/session-timer?preFeeling=${selectedFeeling}`);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <button
            onClick={() => router.push('/dashboard/home')}
            className="inline-flex items-center gap-2 text-gray-text hover:text-navy transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
          
          <div className="border-t border-b border-navy/20 py-6 mb-6 max-w-md mx-auto">
            <h1 className="text-3xl font-light text-navy tracking-[0.15em]">PRE-SESSION</h1>
          </div>
          <p className="text-lg text-navy font-light leading-relaxed">
            How are you feeling right now?
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl luxury-shadow-lg luxury-border p-8">
          <div className="mb-8">
            <p className="text-center text-gray-text mb-2 font-medium">
              Welcome, {stackUser?.displayName || stackUser?.primaryEmail?.split('@')[0] || 'Guest'}
            </p>
            <p className="text-center text-sm text-gray-text">
              Rate your current mood on a scale of 1-10
            </p>
          </div>

          {/* Feeling Scale */}
          <div className="mb-8">
            <div className="grid grid-cols-5 gap-3 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedFeeling(num)}
                  className={`aspect-square rounded-2xl border-2 transition-all duration-300 ${
                    selectedFeeling === num
                      ? 'bg-navy border-navy text-white scale-110 luxury-shadow-lg'
                      : 'bg-white luxury-border text-navy hover:border-navy/50 hover:scale-105'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-xl font-bold">{num}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Scale Labels */}
            <div className="flex justify-between text-xs text-gray-text px-2">
              <span>Not Great</span>
              <span>Excellent</span>
            </div>
          </div>

          {/* Selected Feeling Display */}
          {selectedFeeling !== null && (
            <div className="mb-6 p-4 bg-navy/5 rounded-2xl luxury-border text-center">
              <p className="text-sm text-gray-text mb-1 font-medium">You selected</p>
              <p className="text-4xl font-bold text-navy">{selectedFeeling}/10</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={selectedFeeling === null || isSubmitting}
            className="w-full bg-navy text-white py-4 rounded-full text-lg font-semibold tracking-wide transition-all duration-300 hover:bg-navy-dark disabled:opacity-50 disabled:cursor-not-allowed luxury-shadow-lg"
          >
            {isSubmitting ? 'Starting Session...' : 'Start Recharge Session'}
          </button>

          {/* Info */}
          <div className="mt-8 pt-6 border-t luxury-border">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-navy/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-navy mb-1">Session Duration</p>
                <p className="text-xs text-gray-text leading-relaxed">
                  Your session will last 15 minutes. We'll ask you how you feel again at the end.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
