'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

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

  // Generate next 7 days
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  // Generate time slots
  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date();
        time.setHours(hour, minute, 0, 0);
        slots.push(time);
      }
    }
    return slots;
  };

  const days = getNextDays();
  const timeSlots = getTimeSlots();

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  const isSameTime = (time1: Date, time2: Date) => {
    return time1.getHours() === time2.getHours() && time1.getMinutes() === time2.getMinutes();
  };

  const setSelectedDateTime = (date: Date, time: Date) => {
    const newDate = new Date(date);
    newDate.setHours(time.getHours(), time.getMinutes(), 0, 0);
    setSelectedDate(newDate);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="text-center pt-16 pb-12 px-6">
        <button
          onClick={() => router.push('/dashboard/home')}
          className="inline-flex items-center gap-2 text-gray-text hover:text-navy transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </button>
        
        <div className="border-t border-b border-navy/20 py-8 mb-8 max-w-md mx-auto">
          <h1 className="text-4xl font-light text-navy tracking-[0.2em] mb-2">SCHEDULE</h1>
          <p className="text-sm text-gray-text font-medium tracking-widest uppercase">Your Session</p>
        </div>
        <p className="text-xl text-navy font-light leading-relaxed max-w-sm mx-auto">
          Select a date and time for your recharge session.
        </p>
      </div>

      {/* Date Selection */}
      <div className="px-6 mb-8">
        <h3 className="text-lg font-semibold text-navy mb-4 text-center">Select Date</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDateTime(day, selectedDate)}
              className={`min-w-[80px] p-4 rounded-2xl transition-all duration-300 ${
                isSameDay(selectedDate, day)
                  ? 'bg-navy text-white luxury-shadow-lg'
                  : 'bg-white/80 text-navy luxury-border hover:bg-white'
              }`}
            >
              <div className="text-xs font-medium mb-1">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-lg font-bold">
                {day.getDate()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div className="px-6 mb-8">
        <h3 className="text-lg font-semibold text-navy mb-4 text-center">Select Time</h3>
        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map((time, index) => (
            <button
              key={index}
              onClick={() => setSelectedDateTime(selectedDate, time)}
              className={`p-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                isSameTime(selectedDate, time)
                  ? 'bg-navy text-white luxury-shadow-lg'
                  : 'bg-white/80 text-navy luxury-border hover:bg-white'
              }`}
            >
              {time.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Time Display */}
      <div className="px-6 mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl luxury-shadow-lg luxury-border p-6 text-center">
          <p className="text-sm text-gray-text mb-2 font-medium">Selected Time</p>
          <p className="text-2xl font-bold text-navy mb-1">
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

      {/* Action Buttons */}
      <div className="px-6 pb-8 space-y-4">
        <button
          onClick={handleSchedule}
          disabled={isLoading}
          className="w-full bg-navy text-white py-4 rounded-full text-lg font-semibold tracking-wide transition-all duration-300 hover:bg-navy-dark disabled:opacity-50 disabled:cursor-not-allowed luxury-shadow-lg"
        >
          {isLoading ? 'Confirming...' : 'CONFIRM BOOKING'}
        </button>
        
        <button
          onClick={() => router.push('/dashboard/home')}
          className="w-full bg-transparent border-2 border-navy text-navy py-4 rounded-full text-lg font-semibold tracking-wide transition-all duration-300 hover:bg-navy hover:text-white"
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}
