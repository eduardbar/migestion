import { type ReactNode, type HTMLAttributes, forwardRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, ChevronsUpDown, Check, Minus } from 'lucide-react';
import { Spinner } from '../Spinner';

/**
 * Table component system.
 * Provides sortable, selectable data table with clean design.
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead sortable sortKey="name" onSort={handleSort}>Name</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface TableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (item: T, index: number) => ReactNode;
}

// ─────────────────────────────────────────
// Table Root
// ─────────────────────────────────────────

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  loading?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, loading, children, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      {loading && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
          <Spinner size="lg" />
        </div>
      )}
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props}>
        {children}
      </table>
    </div>
  )
);
Table.displayName = 'Table';

// ─────────────────────────────────────────
// Table Header
// ─────────────────────────────────────────

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('bg-neutral-50 border-b border-neutral-200', className)}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

// ─────────────────────────────────────────
// Table Body
// ─────────────────────────────────────────

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
));
TableBody.displayName = 'TableBody';

// ─────────────────────────────────────────
// Table Row
// ─────────────────────────────────────────

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  clickable?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, clickable, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-neutral-200 transition-colors',
        selected && 'bg-primary-50',
        clickable && 'cursor-pointer hover:bg-neutral-50',
        !selected && !clickable && 'hover:bg-neutral-50/50',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

// ─────────────────────────────────────────
// Table Head Cell
// ─────────────────────────────────────────

interface TableHeadProps extends HTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortKey?: string;
  currentSort?: SortConfig;
  onSort?: (key: string) => void;
  align?: 'left' | 'center' | 'right';
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    { className, sortable, sortKey, currentSort, onSort, align = 'left', children, ...props },
    ref
  ) => {
    const isSorted = sortKey && currentSort?.key === sortKey;
    const sortDirection = isSorted ? currentSort.direction : null;

    const handleSort = () => {
      if (sortable && sortKey && onSort) {
        onSort(sortKey);
      }
    };

    const alignClass = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }[align];

    const SortIcon = () => {
      if (!sortable) return null;

      if (sortDirection === 'asc') {
        return <ChevronUp className="h-4 w-4" />;
      }
      if (sortDirection === 'desc') {
        return <ChevronDown className="h-4 w-4" />;
      }
      return <ChevronsUpDown className="h-4 w-4 text-neutral-400" />;
    };

    return (
      <th
        ref={ref}
        className={cn(
          'h-11 px-4 font-medium text-neutral-600',
          alignClass,
          sortable && 'cursor-pointer select-none hover:text-neutral-900',
          className
        )}
        onClick={sortable ? handleSort : undefined}
        {...props}
      >
        <div
          className={cn(
            'flex items-center gap-1',
            align === 'center' && 'justify-center',
            align === 'right' && 'justify-end'
          )}
        >
          {children}
          <SortIcon />
        </div>
      </th>
    );
  }
);
TableHead.displayName = 'TableHead';

// ─────────────────────────────────────────
// Table Cell
// ─────────────────────────────────────────

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = 'left', ...props }, ref) => {
    const alignClass = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }[align];

    return (
      <td
        ref={ref}
        className={cn('px-4 py-3 text-neutral-900', alignClass, className)}
        {...props}
      />
    );
  }
);
TableCell.displayName = 'TableCell';

// ─────────────────────────────────────────
// Table Checkbox (for selection)
// ─────────────────────────────────────────

interface TableCheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function TableCheckbox({ checked, indeterminate, onChange, disabled }: TableCheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'h-4 w-4 rounded border flex items-center justify-center transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500',
        checked || indeterminate
          ? 'bg-primary-600 border-primary-600 text-white'
          : 'bg-white border-neutral-300 hover:border-neutral-400',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      {indeterminate && !checked && <Minus className="h-3 w-3" strokeWidth={3} />}
    </button>
  );
}

// ─────────────────────────────────────────
// Table Empty State
// ─────────────────────────────────────────

interface TableEmptyProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  colSpan: number;
}

export function TableEmpty({ icon, title, description, action, colSpan }: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-12">
        <div className="flex flex-col items-center text-center">
          {icon && <div className="mb-4 text-neutral-400">{icon}</div>}
          <h3 className="text-lg font-medium text-neutral-900 mb-1">{title}</h3>
          {description && <p className="text-sm text-neutral-500 mb-4 max-w-sm">{description}</p>}
          {action}
        </div>
      </td>
    </tr>
  );
}

// ─────────────────────────────────────────
// useTableSort Hook
// ─────────────────────────────────────────

export function useTableSort(initialKey = '', initialDirection: SortDirection = 'asc') {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: initialKey,
    direction: initialKey ? initialDirection : null,
  });

  const handleSort = useCallback((key: string) => {
    setSortConfig(prev => {
      if (prev.key !== key) {
        return { key, direction: 'asc' };
      }

      if (prev.direction === 'asc') {
        return { key, direction: 'desc' };
      }

      if (prev.direction === 'desc') {
        return { key: '', direction: null };
      }

      return { key, direction: 'asc' };
    });
  }, []);

  return { sortConfig, handleSort };
}

// ─────────────────────────────────────────
// useTableSelection Hook
// ─────────────────────────────────────────

export function useTableSelection<T extends { id: string }>(items: T[] = []) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const isAllSelected = items.length > 0 && selectedIds.size === items.length;
  const isSomeSelected = selectedIds.size > 0 && selectedIds.size < items.length;

  const toggleItem = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map(item => item.id)));
    }
  }, [items, isAllSelected]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const selectedItems = items.filter(item => selectedIds.has(item.id));

  return {
    selectedIds,
    selectedItems,
    isAllSelected,
    isSomeSelected,
    isSelected: (id: string) => selectedIds.has(id),
    toggleItem,
    toggleAll,
    clearSelection,
  };
}
