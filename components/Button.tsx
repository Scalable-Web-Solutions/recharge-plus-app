'use client';

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 transform active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-navy text-white hover:bg-navy-dark focus:ring-navy rounded-xl luxury-shadow-lg hover:luxury-shadow-xl',
    secondary: 'bg-white text-navy border-2 border-navy/20 hover:border-navy/40 hover:bg-cream-dark focus:ring-navy rounded-xl luxury-shadow',
    outline: 'bg-transparent text-navy border-2 border-navy hover:bg-navy hover:text-white focus:ring-navy rounded-xl',
  };
  
  const sizes = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-6 py-3.5 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
