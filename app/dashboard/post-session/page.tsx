'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/Button';
import { useUser } from '@stackframe/stack';

export default function PostSessionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stackUser = useUser();
  const preFeeling = searchParams.get('preFeeling');
  const [selectedFeeling, setSelectedFeeling] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (selectedFeeling === null) return;

    setIsSubmitting(true);

    // Store the post-session feeling (you can add an API route to save this to Firestore)
    // Redirect back to home after showing results
    setTimeout(() => {
      router.push('/dashboard/home');
    }, 3000);
  };

  const improvement = selectedFeeling !== null ? selectedFeeling - Number(preFeeling) : null;

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-border overflow-hidden">
          {/* Header */}
          <div className="bg-navy px-8 py-6 border-b border-gray-border">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Post-Session Check-Out</h1>
              <p className="text-white/80 text-sm">How are you feeling now?</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            <div className="mb-8">
              <p className="text-center text-gray-text mb-2">
                Thank you, {stackUser?.displayName || stackUser?.primaryEmail?.split('@')[0] || 'Guest'}
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
                    className={`aspect-square rounded-xl border-2 transition-all duration-200 ${
                      selectedFeeling === num
                        ? 'bg-navy border-navy text-white scale-110 shadow-lg'
                        : 'bg-white border-gray-border text-navy hover:border-navy/50 hover:scale-105'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <span className="text-2xl font-bold">{num}</span>
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

            {/* Comparison Display */}
            {selectedFeeling !== null && (
              <div className="mb-6 space-y-4">
                <div className="p-4 bg-navy/5 rounded-lg border border-navy/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-center flex-1">
                      <p className="text-xs text-gray-text mb-1">Before</p>
                      <p className="text-3xl font-bold text-gray-text">{preFeeling}/10</p>
                    </div>
                    <div className="px-4">
                      <svg className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-xs text-gray-text mb-1">After</p>
                      <p className="text-3xl font-bold text-navy">{selectedFeeling}/10</p>
                    </div>
                  </div>
                  
                  {improvement !== null && (
                    <div className="text-center pt-3 border-t border-navy/10">
                      <p className="text-sm text-gray-text mb-1">Mood Change</p>
                      <p className={`text-2xl font-bold ${
                        improvement > 0 ? 'text-emerald' : improvement < 0 ? 'text-red-600' : 'text-gray-text'
                      }`}>
                        {improvement > 0 ? '+' : ''}{improvement}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            {!isSubmitting ? (
              <Button
                variant="primary"
                size="lg"
                className="w-full h-14 text-lg"
                onClick={handleSubmit}
                disabled={selectedFeeling === null}
              >
                Complete Check-Out
              </Button>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">Thank You!</h3>
                <p className="text-sm text-gray-text">Returning to dashboard...</p>
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
                  <p className="text-xs font-semibold text-navy mb-1">Session Complete</p>
                  <p className="text-xs text-gray-text leading-relaxed">
                    Your feedback helps us improve the Recharge Room experience.
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
