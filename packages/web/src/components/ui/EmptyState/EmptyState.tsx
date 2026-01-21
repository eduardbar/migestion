import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Empty state component.
 * Used to display a message when there's no content to show.
 */

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}
    >
      {Icon && (
        <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-neutral-400" />
        </div>
      )}
      <h3 className="text-sm font-medium text-neutral-900">{title}</h3>
      {description && <p className="text-sm text-neutral-500 mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
