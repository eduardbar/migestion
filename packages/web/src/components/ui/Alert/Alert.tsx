import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

/**
 * Alert component for feedback messages.
 */

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  info: 'bg-primary-50 text-primary-800 border-primary-200',
  success: 'bg-success-50 text-success-800 border-success-200',
  warning: 'bg-warning-50 text-warning-800 border-warning-200',
  error: 'bg-error-50 text-error-800 border-error-200',
};

const icons: Record<AlertVariant, typeof Info> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

export function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className,
}: AlertProps) {
  const Icon = icons[variant];

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-lg border',
        variantStyles[variant],
        className
      )}
      role="alert"
    >
      <Icon className="h-5 w-5 shrink-0 mt-0.5" />
      
      <div className="flex-1 min-w-0">
        {title && (
          <h5 className="font-medium mb-1">{title}</h5>
        )}
        <div className="text-sm">{children}</div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
