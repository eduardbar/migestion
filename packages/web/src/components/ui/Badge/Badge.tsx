import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Badge component for status labels and tags.
 * Follows design system: minimal, clean colors.
 */

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

type BadgeSize = 'sm' | 'md';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-700',
  primary: 'bg-primary-100 text-primary-700',
  success: 'bg-success-100 text-success-700',
  warning: 'bg-warning-100 text-warning-700',
  error: 'bg-error-100 text-error-700',
  info: 'bg-blue-100 text-blue-700',
};

const dotStyles: Record<BadgeVariant, string> = {
  default: 'bg-neutral-500',
  primary: 'bg-primary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  error: 'bg-error-500',
  info: 'bg-blue-500',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'sm', dot, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotStyles[variant])} />}
      {children}
    </span>
  )
);

Badge.displayName = 'Badge';

// ─────────────────────────────────────────
// Status Badge (Convenience for common statuses)
// ─────────────────────────────────────────

const statusVariantMap: Record<string, BadgeVariant> = {
  active: 'success',
  inactive: 'default',
  pending: 'warning',
  prospect: 'info',
  churned: 'error',
  owner: 'primary',
  admin: 'primary',
  manager: 'info',
  user: 'default',
};

interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: string;
}

export function StatusBadge({ status, ...props }: StatusBadgeProps) {
  const variant = statusVariantMap[status.toLowerCase()] || 'default';
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Badge variant={variant} dot {...props}>
      {label}
    </Badge>
  );
}
