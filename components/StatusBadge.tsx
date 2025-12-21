import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'open' | 'scheduled' | 'closed';
  text: string;
}

export function StatusBadge({ status, text }: StatusBadgeProps) {
  const styles = {
    open: 'bg-emerald text-white',
    scheduled: 'bg-blue-600 text-white',
    closed: 'bg-gray-200 text-gray-700',
  };

  return (
    <div className={cn(
      'inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold tracking-wide luxury-shadow whitespace-nowrap',
      styles[status]
    )}>
      {text}
    </div>
  );
}
