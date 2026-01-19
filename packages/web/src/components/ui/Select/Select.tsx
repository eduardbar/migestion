import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

/**
 * Select component with label and error states.
 * Follows design system: clean, minimal borders.
 */

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      hint,
      options,
      placeholder,
      id,
      value,
      name,
      required,
      disabled,
      onChange,
      ...restProps
    },
    ref
  ) => {
    const selectId = id || name;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e);
    };

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-neutral-700">
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            name={name}
            value={value ?? ''}
            required={required}
            disabled={disabled}
            onChange={handleChange}
            className={cn(
              'w-full px-3 py-2 pr-10 text-sm rounded border bg-white text-neutral-900',
              'appearance-none cursor-pointer',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-1',
              error
                ? 'border-error-500 focus:border-error-500 focus:ring-error-500'
                : 'border-neutral-300 hover:border-neutral-400 focus:border-primary-500 focus:ring-primary-500',
              'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
              !value && placeholder && 'text-neutral-400',
              className
            )}
            {...restProps}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map(option => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
        </div>

        {error && <p className="text-sm text-error-600">{error}</p>}

        {hint && !error && <p className="text-sm text-neutral-500">{hint}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

// ─────────────────────────────────────────
// Native Select (simpler, for forms)
// ─────────────────────────────────────────

interface NativeSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          'w-full px-3 py-2 pr-10 text-sm rounded border bg-white text-neutral-900',
          'appearance-none cursor-pointer',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-1',
          'border-neutral-300 hover:border-neutral-400 focus:border-primary-500 focus:ring-primary-500',
          'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
    </div>
  )
);

NativeSelect.displayName = 'NativeSelect';
