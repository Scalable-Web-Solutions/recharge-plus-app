'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker-custom.css';

export default function SchedulePage() {
  const router = useRouter();
  const { user, setBooking } = useStore();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const handleSchedule = () => {
    setIsLoading(true);

    // Simulate booking
    setTimeout(() => {
      if (user) {
        setBooking({
          id: Math.random().toString(36).substr(2, 9),
          userId: user.id,
          scheduledTime: selectedDate,
          status: 'scheduled',
        });
      }
      setIsLoading(false);
      router.push('/dashboard/home');
    }, 1000);
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  return (
    <div className="min-h-screen bg-cream pb-24">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-navy tracking-tight">
            Schedule Your Session
          </h2>
          <p className="text-lg text-gray-text">Select a date and time for your recharge session</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Date Picker - Takes 2 columns */}
          <Card className="lg:col-span-2 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-xl font-semibold text-navy mb-6">Select Date and Time</h3>
            
            <div className="bg-white rounded-lg border border-gray-border p-6">
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => date && setSelectedDate(date)}
                showTimeSelect
                timeIntervals={30}
                minDate={minDate}
                maxDate={maxDate}
                dateFormat="MMMM d, yyyy h:mm aa"
                inline
                className="w-full"
              />
            </div>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Time Card */}
            <Card className="hover:shadow-md transition-shadow duration-200">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-text mb-2">Selected Time</p>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-navy">
                      {selectedDate.toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                    <p className="text-sm text-gray-text">
                      {selectedDate.toLocaleString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Session Info Card */}
            <Card className="bg-navy/5 border-navy/10">
              <h4 className="text-sm font-semibold text-navy mb-3">
                Session Information
              </h4>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-sm text-gray-text">
                  <svg className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>30 minutes duration</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-text">
                  <svg className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span>Reminder 10 minutes prior</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-text">
                  <svg className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <span>QR code check-in</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="primary"
            size="lg"
            className="flex-1 h-14 text-base"
            onClick={handleSchedule}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Confirming...
              </span>
            ) : (
              'Confirm Booking'
            )}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="sm:w-auto w-full h-14 text-base px-8"
            onClick={() => router.push('/dashboard/home')}
          >
            Cancel
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
